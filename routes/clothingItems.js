const router = require("express").Router();

router.get("/", console.log("all clothing items returned"));
router.post("/", console.log("clothing item created"));
router.delete("/:itemId", () => console.log("clothing item deleted"));

module.exports = router;
