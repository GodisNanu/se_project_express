const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.js");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/", mainRouter);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
