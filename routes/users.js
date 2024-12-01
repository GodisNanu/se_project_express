const router = require("express").Router();

router.get("/", () => console.log("all users returned"));
router.get("/:userId", () => console.log("user by _id returned"));
router.post("/", () => console.log("new user created"));

module.exports = router;
