const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT,
} = require("../utils/errors");

const getUsers = (req, res) => {
  console.log("getUsers Controller");
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server" });
    });
};

const getUser = (req, res) => {
  console.log("getUser Controller");
  const { userid } = req.params;
  User.findById(userid)
    .orFail()
    .then((user) => res.status(200).send(user))
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

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log("createUser Controler ", name, avatar);
  User.create({ name, avatar, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DuplicateKeyError") {
        return res.status(CONFLICT).send({ message: "User Already Exists" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server" });
    });
};

// make sure email is unique and a correct error message is thrown//
//make sure passwords are hashed before being saved//

module.exports = { getUsers, getUser, createUser };
