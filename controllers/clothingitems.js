const ClothingItem = require("../models/clothingItem");

const createClothingItem = (res, req) => {
  console.log("creating Clothing Item");
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl }).then((item) => {
    res
      .status(201)
      .send({ data: item })
      .catch((err) => {
        console.error(err);
      });
  });
};

const getClothingItems = (res, req) => {
  console.log("getting clothing items");
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
    });
};

const deleteClothingItems = (res, req) => {
  const { itemId } = req.params;
  console.log("deleting Clothing Items");
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send(item))
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { createClothingItem, getClothingItems, deleteClothingItems };
