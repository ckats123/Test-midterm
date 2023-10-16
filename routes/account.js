const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");
const listings = require("../db/queries/functions/listings");

router.get("/", (req, res) => {
  users
    .getSellerAccountInfo(req.cookies["email"])
    .then((data) => {
      const userInfo = data.rows[0];
      console.log(userInfo);
      listings.getListingsBySeller(userInfo["id"]).then((myListings) => {
        res.render("account", { userInfo, myListings });
      });
    })
    .catch((error) => {
      // If user not found (not logged in), redirect to log in
      console.log(error);
      res.redirect("/login");
    });
});

module.exports = router;
