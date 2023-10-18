// registration.js

const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");

router.get("/", (req, res) => {
  res.render("registration");
});
