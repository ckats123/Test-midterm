const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  console.log(req.body.email);
  users
    .getUserPassword(req.body.email)
    .then((data) => {
      console.log(`Found user!`);
      if (req.body.email === data.email && req.body.password === data.password) {
        console.log('Valid credentials! Logging in.');
        res.cookie('email', data.email);
        res.redirect('/');
      } else {
        console.log('Invalid credentials!');
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({ error: "User not found" });
    });
});

module.exports = router;
