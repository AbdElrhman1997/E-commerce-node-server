const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config.json");
const PORT = process.env.PORT || 5000;

// Routes
const productRouter = require("./routes/produts");
const userRouter = require("./routes/users");

app.use(cors());
app.options("*", cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

mongoose
  .connect(config.localDB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app runing in port ${PORT} ....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
