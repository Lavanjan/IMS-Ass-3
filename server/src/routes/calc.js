const express = require("express");
const { addition } = require("../controllers/calc");

const router = express.Router();

router.get("/:num1/add/:num2", addition);

module.exports = router;
