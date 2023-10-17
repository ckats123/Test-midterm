const express = require("express");
const router = express.Router();
const listings = require("../db/queries/functions/listings");

router.get("/", (req, res) => {
  if (req.cookies["email"] && req.cookies["is_seller"]) {
    res.render("create-listing");
  } else {
    res.status(401).send("You are not logged in or not a seller");
  }
});

router.post("/", (req, res) => {
  if (req.cookies["email"] && req.cookies["is_seller"]) {
    listings.createNewListing(req.cookies["user_id"], req.body.title, req.body.price, req.body.description)
    .then ((data) => {
      console.log("Successfully inserted new listing entry. Redirecting...")
      res.redirect('/account')
    })
  } else {
    res.status(401).send("You are not logged in or not a seller");
  }
});

module.exports = router;
