const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Page not found" });
});

module.exports = router;
