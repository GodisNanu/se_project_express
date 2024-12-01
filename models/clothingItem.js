const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },

  weather: {
    required: true,
    type: String,
    enum: ["hot", "warm", "chilly", "cold"],
  },

  imageUrl: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },

  owner: {
    required: true,
    type: ObjectId,
  },

  likes: {
    ref: "user",
    type: ObjectId,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});