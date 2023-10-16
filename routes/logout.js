const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie('email');
  res.redirect('/');
})


module.exports = router;
