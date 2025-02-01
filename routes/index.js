const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const app = express();

app.post("/signin", login);
app.post("/signup", createUser);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Page not found" });
});

module.exports = router;
