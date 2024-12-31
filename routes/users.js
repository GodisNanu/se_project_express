const router = require("express").Router();
const { getUsers, getUser, createUser } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userid", getUser);
router.post("/", createUser);

module.exports = router;
