const crypto = require("crypto");

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function isValidPasswordHashFormat(storedHash) {
  const parts = storedHash.split(":");

  if (parts.length !== 2) {
    return false;
  }

  const [saltHex, hashHex] = parts;

  return (
    saltHex.length > 0 &&
    hashHex.length > 0 &&
    /^[0-9a-fA-F]+$/.test(saltHex) &&
    /^[0-9a-fA-F]+$/.test(hashHex)
  );
}

function getSessionSecret() {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!sessionSecret || sessionSecret.length < 32) {
    return null;
  }

  return sessionSecret;
}

function isAdminAuthConfigured() {
  return getSessionSecret() !== null;
}

function createPasswordHash(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);

  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

function verifyPasswordHash(password, storedHash) {
  if (!isValidPasswordHashFormat(storedHash)) {
    return false;
  }

  const [saltHex, hashHex] = storedHash.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const expectedHash = Buffer.from(hashHex, "hex");
  const derivedHash = crypto.scryptSync(password, salt, 64);

  if (expectedHash.length !== derivedHash.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedHash, derivedHash);
}

function createAdminSessionToken() {
  const sessionSecret = getSessionSecret();

  if (!sessionSecret) {
    return null;
  }

  const now = Date.now();
  const payload = {
    exp: now + SESSION_DURATION_MS,
    iat: now,
  };
  const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );
  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(payloadEncoded)
    .digest("base64url");

  return `${payloadEncoded}.${signature}`;
}

function verifyAdminSessionToken(token) {
  const sessionSecret = getSessionSecret();

  if (!sessionSecret || !token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [payloadEncoded, signatureProvided] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", sessionSecret)
    .update(payloadEncoded)
    .digest("base64url");
  const signatureBuffer = Buffer.from(signatureProvided, "base64url");
  const expectedSignatureBuffer = Buffer.from(expectedSignature, "base64url");

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
    return false;
  }

  let payload;

  try {
    payload = JSON.parse(
      Buffer.from(payloadEncoded, "base64url").toString("utf8"),
    );
  } catch {
    return false;
  }

  if (
    typeof payload.exp !== "number" ||
    !Number.isFinite(payload.exp) ||
    Date.now() > payload.exp
  ) {
    return false;
  }

  return true;
}

module.exports = {
  isAdminAuthConfigured,
  createPasswordHash,
  verifyPasswordHash,
  createAdminSessionToken,
  verifyAdminSessionToken,
};
