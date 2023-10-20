const express = require("express");
const router = express.Router();
const reviews = require("../db/queries/functions/reviews");

router.post("/", (req, res) => {
  console.log("Posting new review");
  console.log(req.body);
  reviews.getReview(req.body.transactionId).then((retrievedReview) => {
    if (retrievedReview) {
      console.log("Review already exists! :", retrievedReview);
    } else {
      console.log("No existing review found. Proceeding");
      reviews
        .postNewReview(
          req.body.transactionId,
          req.body.reviewRating,
          req.body.reviewText
        )
        .then((createdReview) => {
          console.log(createdReview);
          res.redirect('/account')
        });
    }
  });
});

module.exports = router;
