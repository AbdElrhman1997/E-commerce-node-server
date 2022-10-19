const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (err) {
    next(err);
  }
});

router.get("/product/:id", async (req, res, next) => {
  try {
    const products = await Product.find({ _id: req.params.id });
    res.json({ data: products });
  } catch (err) {
    next(err);
  }
});

router.get("/:cat", async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.cat });
    res.json({ data: products });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
