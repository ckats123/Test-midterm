// login.js

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
      if (
        req.body.email === data.email &&
        req.body.password === data.password
      ) {
        console.log("Valid credentials! Logging in.");
        // Set the cookies
        if (data.is_seller) {
          res.cookie("email", data.email);
          res.cookie("is_seller", "1"); // "1" same as truthy
          console.log("is_seller cookie set to true");
        } else {
          res.cookie("email", data.email);
          res.cookie("is_seller", ""); // "" same as falsy
          console.log("is_seller cookie set to false");
        }
        res.redirect("/");
      } else {
        console.log("Invalid credentials!");
        // Handle invalid login credentials, e.g., show an error message.
        res.send("Invalid credentials");
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({ error: "User not found" });
    });
});

module.exports = router;
