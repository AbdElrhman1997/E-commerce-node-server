const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config.json");
const port = process.env.PORT || 4000;

// Routes
const productRouter = require("./routes/produts");
const userRouter = require("./routes/users");
const imageRouter = require("./routes/images");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/", express.static("public/Images"));

mongoose
  .connect(config.localDB, () => {
    console.log("connect to db done");
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`app runing in port ${port} ....`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
