const router = require("express").Router();
const {
  createClothingItem,
  getClothingItems,
  deleteClothingItems,
  putLikeItem,
  deleteLikeItem,
} = require("../controllers/clothingitems");
const auth = require("../middlewares/auth");
const {
  validateItemId,
  validateCardBody,
} = require("../middlewares/validation");

router.get("/", getClothingItems);
router.post("/", auth, validateCardBody, createClothingItem);
router.delete("/:itemId", auth, validateItemId, deleteClothingItems);
router.put("/:itemId/likes", auth, validateItemId, putLikeItem);
router.delete("/:itemId/likes", auth, validateItemId, deleteLikeItem);

module.exports = router;
