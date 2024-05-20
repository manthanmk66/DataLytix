const express = require("express");

const cors = require("cors");
const { dbconnect } = require("./config/database");
const app = express();
require("../server/config/database");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());

dbconnect();

app.use(
  cors({
    origin: "*",
  })
);

app.listen(PORT, () => {
  console.log(`Server is Running on Port- ${PORT}`);
});
