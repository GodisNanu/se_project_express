const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  FORBIDDEN,
} = require("../utils/errors");

const createClothingItem = (req, res) => {
  console.log("creating Clothing Item");
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server" });
    });
};

const getClothingItems = (req, res) => {
  console.log("getting clothing items");
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server" });
    });
};

const deleteClothingItems = (req, res) => {
  const { itemId } = req.params;
  console.log("deleting Clothing Items");
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return res
          .status(FORBIDDEN)
          .SEND({ message: "You are not authorized to delete this item" });
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then((deletedItem) => res.status(200).send(deletedItem))
        .catch((err) => {
          console.error(err);
          if (err.name === "CastError") {
            return res
              .status(BAD_REQUEST)
              .send({ message: "Invalid data provided" });
          }
          if (err.name === "DocumentNotFoundError") {
            return res
              .status(NOT_FOUND)
              .send({ message: "Id provided was not found" });
          }
          return res
            .status(DEFAULT)
            .send({ message: "An error has occured on the server" });
        });
    });
};

const putLikeItem = (req, res) => {
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
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Id provided was not found" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server" });
    });
};

const deleteLikeItem = (req, res) => {
  console.log("removing like");
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Id provided was not found" });
      }
      return res
        .status(DEFAULT)
        .send({ messsage: "An error has occured on the server" });
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItems,
  putLikeItem,
  deleteLikeItem,
};
