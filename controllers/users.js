const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");
const UnauthorizedError = require("../errors/unauthorized-err");

const getCurrentUser = (req, res, next) => {
  console.log("getCurrentUser Controller");

  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Id provided was not found"));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  console.log("createUser Controler ", name, avatar);
  if (!email || !password || !name || !avatar) {
    return next(new BadRequestError("Missing data"));
  }
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError("User already exists"));
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((user) => {
          User.findById(user._id)
            .select("-password")
            .then((userWithoutPassword) =>
              res.status(201).send(userWithoutPassword)
            );
        });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  console.log("login controller", email, password);

  if (!email || !password) {
    return next(new BadRequestError("Invalid data provided"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return next(new BadRequestError("Invalid data provided"));
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "UnauthorizedError") {
        return next(new UnauthorizedError("Incorrect email and password"));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  console.log("updateProfile controller", name, avatar);
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Id provided was not found"));
      }
      return next(err);
    });
};

module.exports = { getCurrentUser, createUser, login, updateProfile };
