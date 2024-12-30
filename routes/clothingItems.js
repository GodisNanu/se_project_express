const router = require("express").Router();
const {
  createClothingItem,
  getClothingItems,
  deleteClothingItems,
  putLikeItem,
  deleteLikeItem,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItems);
router.put("/:itemId/likes", putLikeItem);
router.delete("/:itmeId/likes", deleteLikeItem);

module.exports = router;
