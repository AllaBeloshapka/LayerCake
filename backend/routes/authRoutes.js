const express = require("express");
const AdminUser = require("../models/AdminUser");
const {
  createPasswordHash,
  verifyPasswordHash,
  createAdminSessionToken,
} = require("../services/adminAuthService");

const router = express.Router();

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

module.exports = router;
