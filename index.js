const express = require("express");
const mongoose = require("mongoose");
const authentication = require("./routes/auth");
const post = require("./routes/post");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://purnasaikrishnainnamuri23:12345@cluster0.savpbt3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   "mongodb+srv://nexHome:12345@cluster0.uqfgbkh.mongodb.net/nexHome?retryWrites=true&w=majority"
);

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
