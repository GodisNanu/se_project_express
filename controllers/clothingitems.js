const ClothingItem = require("../models/clothingItem");

const createClothingItem = (req, res) => {
  console.log("creating Clothing Item");
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner }).then((item) => {
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

const putLikeItem = (req, res) => {
  const { itemId } = req.params;
  console.log("adding like");
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const deleteLikeItem = (req, res) => {
  const { itemId } = req.params;
  console.log("removing like");
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.usre._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(204).send(item))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ messsage: err.messsage });
    });
};
module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItems,
  putLikeItem,
  deleteLikeItem,
};
