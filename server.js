const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Teste"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
