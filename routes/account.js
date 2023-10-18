const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");
const listings = require("../db/queries/functions/listings");
const transactions = require("../db/queries/functions/transactionLog");
const reviews = require("../db/queries/functions/reviews");

router.get("/", (req, res) => {
  // This is all logic for seller users. A cursed async nightmare
  if (req.cookies["is_seller"]) {
    users
      .getSellerAccountInfo(req.cookies["email"])
      .then((data) => {
        const userInfo = data[0];
        listings.getListingsBySeller(userInfo.user_id).then((myListings) => {
          transactions
            .getSellerTransactionLog(userInfo.user_id)
            .then((mySalesLog) => {
              transactions
                .getBuyerTransactionLog(userInfo.user_id)
                .then((myBuyLog) => {
                  reviews
                    .getReviewsForMultipleTransactions(mySalesLog)
                    .then((myReviews) => {
                      const isSeller = req.cookies["is_seller"];
                      res.render("account", {
                        userInfo,
                        myListings,
                        mySalesLog,
                        myBuyLog,
                        myReviews,
                        isSeller,
                      });
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
  } else {
    // This is all the logic for if the user is only a buyer
    const isSeller = req.cookies["is_seller"];
    users.getUserByEmail(req.cookies["email"]).then((userInfo) => {
      transactions.getBuyerTransactionLog(userInfo.id).then((myBuyLog) => {
        console.log(myBuyLog);
        res.render("account", { userInfo, isSeller, myBuyLog });
      });
    })
    .catch((error) => {
      // If user not found (not logged in), redirect to log in
      console.log(error);
      res.redirect("/login");
    });;
  }
});

module.exports = router;
