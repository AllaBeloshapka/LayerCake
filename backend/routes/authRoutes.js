const express = require("express");
const crypto = require("crypto");
const AdminUser = require("../models/AdminUser");
const requireAdminAuth = require("../middleware/requireAdminAuth");
const { sendTransactionalEmail } = require("../services/emailService");
const {
  createPasswordHash,
  verifyPasswordHash,
  createAdminSessionToken,
} = require("../services/adminAuthService");

const router = express.Router();

function createEmailVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashEmailVerificationToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function buildApiBaseUrl() {
  const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";

  return baseUrl.replace(/\/+$/, "");
}

function buildEmailVerificationLink(token) {
  const baseUrl = buildApiBaseUrl();

  return `${baseUrl}/api/auth/email-verification/confirm?token=${encodeURIComponent(token)}`;
}

router.post("/setup", async (req, res) => {
  try {
    const existingAdmin = await AdminUser.findOne().select("_id");

    if (existingAdmin) {
      res.status(409).json({ message: "Admin account already exists" });
      return;
    }

    const { username: rawUsername, email: rawEmail, password } = req.body;

    if (
      typeof rawUsername !== "string" ||
      typeof rawEmail !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({ message: "Invalid admin account data" });
      return;
    }

    const username = rawUsername.trim();
    const email = rawEmail.trim();

    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      res.status(400).json({ message: "Invalid email address" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    const passwordHash = createPasswordHash(password);

    await AdminUser.create({
      username,
      email,
      passwordHash,
    });

    res.status(201).json({ message: "Admin account created" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Admin account already exists" });
      return;
    }

    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid admin account data" });
      return;
    }

    res.status(500).json({ message: "Failed to create admin account" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail: rawUsernameOrEmail, password } = req.body;

    if (
      typeof rawUsernameOrEmail !== "string" ||
      typeof password !== "string"
    ) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const usernameOrEmail = rawUsernameOrEmail.trim();

    if (!usernameOrEmail || !password) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const admin = await AdminUser.findOne({
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail.toLowerCase() },
      ],
    });

    if (!admin || !verifyPasswordHash(password, admin.passwordHash)) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = createAdminSessionToken();

    if (!token) {
      res.status(500).json({
        message: "Server authentication is not configured",
      });
      return;
    }

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
  }
});

router.get("/me", requireAdminAuth, async (req, res) => {
  try {
    const admin = await AdminUser.findOne().select("username email emailVerified");

    if (!admin) {
      res.status(404).json({ message: "Admin account not found" });
      return;
    }

    res.json({
      username: admin.username,
      email: admin.email,
      emailVerified: Boolean(admin.emailVerified),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin account" });
  }
});

router.patch("/password", requireAdminAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (typeof currentPassword !== "string" || !currentPassword) {
      res.status(400).json({ message: "Current password is required" });
      return;
    }

    if (typeof newPassword !== "string") {
      res.status(400).json({ message: "Invalid password data" });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    const admin = await AdminUser.findOne();

    if (!admin) {
      res.status(404).json({ message: "Admin account not found" });
      return;
    }

    if (!verifyPasswordHash(currentPassword, admin.passwordHash)) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }

    admin.passwordHash = createPasswordHash(newPassword);
    await admin.save();

    res.json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

router.post("/email-verification/request", requireAdminAuth, async (req, res) => {
  try {
    const admin = await AdminUser.findOne();

    if (!admin) {
      res.status(404).json({ message: "Admin account not found" });
      return;
    }

    if (admin.emailVerified) {
      res.status(200).json({
        message: "Email is already verified",
        emailVerified: true,
      });
      return;
    }

    const rawToken = createEmailVerificationToken();
    const tokenHash = hashEmailVerificationToken(rawToken);

    admin.emailVerificationTokenHash = tokenHash;
    admin.emailVerificationExpiresAt = new Date(Date.now() + 1000 * 60 * 60);
    await admin.save();

    const verificationLink = buildEmailVerificationLink(rawToken);

    const text = `Please verify your LayerCake admin email address by opening this link:

${verificationLink}

This link expires in 1 hour.

If you did not request this email, you can ignore it.`;

    const html = `<p>Please verify your LayerCake admin email address.</p>
<p><a href="${verificationLink}">Verify email</a></p>
<p>This link expires in 1 hour.</p>
<p>If you did not request this email, you can ignore it.</p>`;

    try {
      await sendTransactionalEmail({
        to: admin.email,
        subject: "Verify your LayerCake admin email",
        text,
        html,
      });
    } catch (error) {
      admin.emailVerificationTokenHash = null;
      admin.emailVerificationExpiresAt = null;
      await admin.save();

      res.status(500).json({ message: "Failed to send verification email" });
      return;
    }

    res.status(200).json({
      message: "Verification email sent",
      emailVerified: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send verification email" });
  }
});

router.get("/email-verification/confirm", async (req, res) => {
  try {
    const { token } = req.query;

    if (typeof token !== "string" || !token) {
      res.status(400).send(
        "<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Email verification</title></head><body><p>Verification link is invalid.</p></body></html>",
      );
      return;
    }

    const tokenHash = hashEmailVerificationToken(token);

    const admin = await AdminUser.findOne({
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpiresAt: { $gt: new Date() },
    });

    if (!admin) {
      res.status(400).send(
        "<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Email verification</title></head><body><p>Verification link is invalid or expired.</p></body></html>",
      );
      return;
    }

    admin.emailVerified = true;
    admin.emailVerificationTokenHash = null;
    admin.emailVerificationExpiresAt = null;
    await admin.save();

    res.status(200).send(
      "<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Email verification</title></head><body><p>Email verified successfully. You can close this page and return to LayerCake admin.</p></body></html>",
    );
  } catch (error) {
    res.status(500).send(
      "<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Email verification</title></head><body><p>Verification failed. Please try again later.</p></body></html>",
    );
  }
});

module.exports = router;
