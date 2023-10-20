const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");
const transactions = require("../db/queries/functions/transactions");

router.post("/", (req, res) => {
  console.log("Posting new review");
  console.log(req.body);
})

module.exports = router;
