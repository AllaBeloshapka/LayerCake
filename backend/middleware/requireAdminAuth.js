function requireAdminAuth(req, res, next) {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    res.status(500).json({ message: "Server authentication is not configured" });
    return;
  }

  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token || token !== adminToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
}

module.exports = requireAdminAuth;
