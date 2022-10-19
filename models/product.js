const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  imgSrc: {
    type: String,
  },
  category: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", Product);
