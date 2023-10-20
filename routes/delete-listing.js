const express = require("express");
const router = express.Router();
const listings = require("../db/queries/functions/listings");


router.post("/", (req, res) => {
  console.log("deleting listing id", req.body.listingId);
  listings.deleteListing(req.body.listingId).then (() => {
  console.log("Delete successful");
  res.redirect('/account')
  })

});


module.exports = router;
