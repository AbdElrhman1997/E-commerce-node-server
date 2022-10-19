const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  Invoices: [
    {
      date: String,
      invoice: [
        {
          item: {
            imgSrc: String,
            category: String,
            name: String,
            description: String,
            price: Number,
          },
          status: String,
          quantity: Number,
        },
      ],
      totalPrice: Number,
    },
  ],
});

module.exports = mongoose.model("User", User);
