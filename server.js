const express = require("express");
const cors = require("cors");
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true }));
app.use(cors());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("successfuly connected to mongodb"))
  .catch((err) => console.log("connection error", err));

app.get("/", (req, res) => res.send("Teste"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0",() => {
  console.log(`server running on ${PORT}`);
});
