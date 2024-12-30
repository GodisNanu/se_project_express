const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.js");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: `6760b7449d0483d810c9dde9`,
  };
  next();
});

app.use("/", mainRouter);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
