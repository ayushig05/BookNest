const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, "book123", (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .json({ message: "Token expired or invalid. Please SignIn again" });
    }
    req.user = decoded.authClaims;
    next();
  });
};

module.exports = { authenticateToken };
