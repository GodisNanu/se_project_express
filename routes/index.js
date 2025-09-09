const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/not-found-err");
const {
  validateUserInfo,
  validateAuthentication,
} = require("../middlewares/validation");

router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserInfo, createUser);

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Page not found"));
});

module.exports = router;
