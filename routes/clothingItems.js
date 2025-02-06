const router = require("express").Router();
const {
  createClothingItem,
  getClothingItems,
  deleteClothingItems,
  putLikeItem,
  deleteLikeItem,
} = require("../controllers/clothingitems");
const auth = require("../middlewares/auth");

router.get("/", getClothingItems);
router.post("/", auth, createClothingItem);
router.delete("/:itemId", auth, deleteClothingItems);
router.put("/:itemId/likes", auth, putLikeItem);
router.delete("/:itemId/likes", auth, deleteLikeItem);

module.exports = router;
