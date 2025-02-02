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
    payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload._id) {
      return res
        .status(UNAUTHORIZED)
        .send({ message: "Missing or invalid authorization" });
    }
    req.user = payload;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(UNAUTHORIZED).send({ message: "Authentication failed" });
  }
};
