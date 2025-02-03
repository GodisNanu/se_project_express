const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use("/", mainRouter);
app.use(cors());

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
