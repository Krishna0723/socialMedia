const express = require("express");
const auth = express.Router();
const authData = require("../schema/authData");
const jwt = require("jsonwebtoken");

auth.post("/login", (req, res) => {
  const { email, password } = req.body;
  authData.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ id: user._id }, "kafjvjdfv9h43t58b");
        user.token=token

        user.save()
        const { password: pass, ...rest } = user._doc;
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
          userData: rest,
          msg: "Sucess",
        });
      } else {
        res.json({ msg: "Password is wrong" });
      }
    } else {
      res.json({ msg: "Email id is not registered" });
    }
  });
});

auth.post("/signUp", (req, res) => {
  const data = req.body;
  authData.findOne({ email: data.email }).then((user) => {
    if (user) {
      res.json("User already exixts");
    } else {
      authData.create(req.body, (err, data) => {
        if (err) {
          return err;
        } else {
          res.json(data);
        }
      });
    }
  });
});

auth.delete("/deleteUser/:id", (req, res) => {
  authData.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

auth.get("/getUser/:id", async (req, res) => {
  //console.log("Function Called");
  let id = req.params.id;
  let data = await authData.findById(id);
  //console.log(data);
  res.status(200).json({
    message: "success",
    dat: data,
  });
});

auth.get("/allUsers", (req, res) => {
  authData.find(req.body,(err, data) => {
    if (err) {
      return err;
    } else {
      res.json(data);
    }
  });
});


module.exports = auth;
