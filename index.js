const express = require("express");
const mongoose = require("mongoose");
const authentication = require("./routes/auth");
const post = require("./routes/post");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const env = require("dotenv");
env.config();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.dbString);

var db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to DB");
});
db.on("error", () => {
  console.log("error occured");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/account", authentication);
app.use("/data", post);

app.listen(4000, () => {
  console.log("started at 4000");
});
