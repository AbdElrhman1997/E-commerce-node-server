const User = require("../models/user");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const Token = require("../models/token");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get("/:email", async (req, res, next) => {
  try {
    const user = await User.find({ email: req.params.email });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});
router.get("/profile/:token", async (req, res, next) => {
  try {
    const user = await User.find({ token: req.params.token });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});
router.get("/orders/:token", async (req, res, next) => {
  try {
    const user = await User.find({ token: req.params.token });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});
router.post("/register", async (req, res, next) => {
  try {
    const token = jwt.sign({ id: req.body.password }, "privateKey");
    const newToken = new Token({
      token: token,
    }).save();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      token: token,
    }).save();
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    console.log(user);
    if (user.length != 0) {
      bcrypt.compare(req.body.password, user[0].password).then((result) => {
        if (result) {
          res
            .header("x-auth-token", user.token)
            .json({ user: user, token: user.token });
        } else {
          res.status("500").send("invalid email or password");
        }
      });
      console.log("there");
    } else {
      res.status("500").send("invalid email or password");
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:token", async (req, res) => {
  try {
    const user = await User.find({ token: req.params.token });
    let updatedUser = user[0];
    updatedUser.userName = updatedUser.userName;
    updatedUser.email = updatedUser.email;
    updatedUser.password = updatedUser.password;
    updatedUser.token = updatedUser.token;

    updatedUser.Invoices = [...updatedUser.Invoices, ...req.body];

    updatedUser.save();
    res.json(updatedUser);
    console.log(req.body);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = router;
