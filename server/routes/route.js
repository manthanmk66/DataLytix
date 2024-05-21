const express = require("express");
const router = express.Router();
const { getData } = require("../controller/dataController");

// Route to get data
router.get("/data", getData);

module.exports = router;
