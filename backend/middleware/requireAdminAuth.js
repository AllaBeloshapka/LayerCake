const {
  isAdminAuthConfigured,
  verifyAdminSessionToken,
} = require("../services/adminAuthService");

function requireAdminAuth(req, res, next) {
  if (!isAdminAuthConfigured()) {
    res.status(500).json({ message: "Server authentication is not configured" });
    return;
  }

  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token || !verifyAdminSessionToken(token)) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
}

module.exports = requireAdminAuth;
