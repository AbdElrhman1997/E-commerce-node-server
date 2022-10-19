const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: String,
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
