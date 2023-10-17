const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie('email');
  res.clearCookie('is_seller');
  res.redirect('/');
});

module.exports = router;
