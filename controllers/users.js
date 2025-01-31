const bcrypt = require("bcryptjs");
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

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data provided" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occured on the server" });
    });

  //create login controller that gets email and password then authenticates them
  userSchema.statics.findUserByCredentials = function findUserByCredentials(
    email,
    password
  ) {
    return this.fidnOne({ email }).then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email orpassword"));
        }
        return user;
      });
    });
  };
};

module.exports = { getUsers, getUser, createUser };
