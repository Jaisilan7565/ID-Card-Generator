const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cardRouter = require("./router/IDCardRouter");

const PORT = process.env.PORT || 5000;

require("dotenv").config();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/v1/id-card", cardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
