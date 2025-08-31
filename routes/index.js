const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/not-found-err");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => {
  next(new NotFoundError("Page not found"));
});

module.exports = router;
