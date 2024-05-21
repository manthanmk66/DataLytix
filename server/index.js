const express = require("express");

const cors = require("cors");
const { dbconnect } = require("./config/database");
const app = express();
const dataRoutes = require("../server/routes/route");
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

app.use("/", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on Port- ${PORT}`);
});
