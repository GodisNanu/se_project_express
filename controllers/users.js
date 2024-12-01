const User = require("../models/user");

const getUsers = (req, res) => {
  console.log("getUsers Controller");
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
    });
};

const getUser = (req, res) => {
  console.log("getUser Controller");
  const { userid } = req.params;
  User.findById(userid)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  console.log("createUser Controler ", name, avatar);
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getUsers, getUser, createUser };
