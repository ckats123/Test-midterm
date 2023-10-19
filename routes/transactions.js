const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");
const transactions = require("../db/queries/functions/transactions");

router.post("/", (req, res) => {
  users
    .getUserByEmail(req.body["buyer_email"])
    .then((retrievedUser) => {
      users
        .getListingOwner(req.body.transaction_listing_id)
        .then((listingOwner) => {
          if (
            listingOwner &&
            retrievedUser &&
            listingOwner.seller_id == req.cookies.user_id
          ) {
            console.log("listing is yours");
            transactions
              .postNewTransaction(
                req.body.transaction_listing_id,
                Number(retrievedUser.id),
                req.body.purchase_date,
                req.body.final_cost
              )
              .then((createdTransaction) => {
                console.log(createdTransaction);
                res.redirect('/account'); // Successfully posted the transaction.
              })
              .catch((transactionError) => {
                console.error("Error posting transaction:", transactionError);
                res.sendStatus(500); // Server error when posting the transaction.
              });
          } else {
            res.sendStatus(400); // Bad request, user doesn't own listing.
          }
        })
        .catch((listingOwnerError) => {
          console.error("Error retrieving listing owner:", listingOwnerError);
          res.sendStatus(500); // Server error when retrieving listing owner.
        });
    })
    .catch((userError) => {
      console.error("Error retrieving user by email:", userError);
      res.sendStatus(500); // Server error when retrieving buyer user by email.
    });
});

module.exports = router;
