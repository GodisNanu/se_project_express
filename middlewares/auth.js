const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const UnauthorizedError = require("../errors/unauthorized-err");

module.exports = (req, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    next(new UnauthorizedError("Missing or invalid authorization"));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload._id) {
      next(new UnauthorizedError("Missing or invalid authorization"));
    }
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError("Authentication failed"));
  }
};
