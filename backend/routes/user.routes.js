const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../models/User.model");

const userController = Router();

userController.post("/signup", async (req, res) => {
  //   console.log(req);
  try {
    const { name, email, password } = req.body;
    if (name && email && password) {
      let isFind = await UserModel.findOne({ email });
      if (isFind) {
        res.send({
          msg: "User Already Registered",
          status: 404,
        });
      } else {
        bcrypt.hash(password, 5, async function (err, hash) {
          if (err) {
            res.send({
              msg: "somthing went wrong",
              status: 500,
            });
          } else {
            const user = new UserModel({
              name,
              email,
              password: hash,
            });
            await user.save();
            res.send({
              msg: "Signup successfull",
              status: 200,
            });
          }
        });
      }
    } else {
      res.send({ msg: "All fields are required" });
    }
  } catch (err) {
    res.send({ status: 500, msg: "Register Failed 1" });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await UserModel.findOne({ email });
  if (user) {
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res.send({ status: 200, token });
      } else {
        res.send({ status: 500, msg: "Wrong Credentials" });
      }
    });
  } else {
    res.send({ status: 500, msg: "Wrong Credentials" });
  }
});

module.exports = { userController };
