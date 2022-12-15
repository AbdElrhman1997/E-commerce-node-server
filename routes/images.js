const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const app = express();

router.get("/", async (req, res, next) => {
  try {
    const image = "../public/Images/bgHome.jpg";
    res.send(image);
  } catch (err) {
    next(err);
  }
});

router.get("/image/:id", async (req, res, next) => {
  try {
    const products = await Product.find({ _id: req.params.id });
    res.json({ data: products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
