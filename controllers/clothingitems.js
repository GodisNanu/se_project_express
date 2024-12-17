const ClothingItem = require("../models/clothingItem");

const createClothingItem = (req, res) => {
  console.log("creating Clothing Item");
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl }).then((item) => {
    res
      .status(201)
      .send({ data: item })
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res.status(400).send({ message: err.message });
        }
        return res.status(500).send({ message: err.message });
      });
  });
};

const getClothingItems = (req, res) => {
  console.log("getting clothing items");
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const deleteClothingItems = (req, res) => {
  const { itemId } = req.params;
  console.log("deleting Clothing Items");
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { createClothingItem, getClothingItems, deleteClothingItems };
module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
};
