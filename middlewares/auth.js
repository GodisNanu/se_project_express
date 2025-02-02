const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Missing or invalid authorization" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Missing or invalid authorization" });
  }
};
