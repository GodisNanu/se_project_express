const router = require("express").Router();
const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("../utils/errors");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => {
  return res.status(NOT_FOUND).send({ message: "Page not found" });
});

module.exports = router;
