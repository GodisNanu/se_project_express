const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../errors/bad-request-err");
const DefaultError = require("../errors/default-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");

const createClothingItem = (req, res, next) => {
  console.log("creating Clothing Item");
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      } else {
        return next(err);
      }
    });
};

const getClothingItems = (res, next) => {
  console.log("getting clothing items");
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => next(new DefaultError("An error occurred on the server")));
};

const deleteClothingItems = (req, res, next) => {
  const { itemId } = req.params;
  console.log("deleting Clothing Items");

  if (!req.user) {
    next(new UnauthorizedError("Authentication Required"));
  }

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return next(
          new ForbiddenError("You are not authorized to delete this item")
        );
      }
      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) =>
        res.status(200).send(deletedItem)
      );
    })
    .catch((err) => {
      console.error("Item deletion error", err);
      if (err.name === "ForbiddenError") {
        return next(new ForbiddenError("User not authorized"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Id provided was not found"));
      } else {
        return next(err);
      }
    });
};

const putLikeItem = (req, res, next) => {
  console.log("adding like");
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Id provided was not found"));
      } else {
        return next(err);
      }
    });
};

const deleteLikeItem = (req, res, next) => {
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
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Id provided was not found"));
      } else {
        return next(err);
      }
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItems,
  putLikeItem,
  deleteLikeItem,
};
