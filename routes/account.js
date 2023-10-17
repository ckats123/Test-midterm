const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");
const listings = require("../db/queries/functions/listings");
const transactions = require("../db/queries/functions/transactionLog");
const reviews = require("../db/queries/functions/reviews");

router.get("/", (req, res) => {
  users
    .getSellerAccountInfo(req.cookies["email"])
    .then((data) => {
      const userInfo = data[0];
      listings.getListingsBySeller(userInfo["id"]).then((myListings) => {
        transactions.getSellerTransactionLog(userInfo.id).then((mySalesLog) => {
          reviews
            .getReviewsForMultipleTransactions(mySalesLog)
            .then((myReviews) => {
              console.log(mySalesLog);
              console.log(myReviews);
              const isSeller = req.cookies["is_seller"];
              res.render("account", {
                userInfo,
                myListings,
                mySalesLog,
                myReviews,
                isSeller
              });
            });
        });
      });
    })
    .catch((error) => {
      // If user not found (not logged in), redirect to log in
      console.log(error);
      res.redirect("/login");
    });
});

module.exports = router;
