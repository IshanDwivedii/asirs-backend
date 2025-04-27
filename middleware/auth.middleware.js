const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // { id, role }
    next();
  });
}

module.exports = { authenticateToken };
