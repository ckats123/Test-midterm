/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");

router.get("/", (req, res) => {
  res.render("users");
});

router.post("/", (req, res) => {
  const submittedDetails = req.body;
  if (!submittedDetails.is_seller) {
    // Buyer logic
    users.addBuyerUser(submittedDetails).then((createdUser) => {
      console.log("Created Buyer User:", createdUser);
    })
    .catch((error) => {
      console.error("Error creating buyer user:", error);
      res.status(500).send("An error occurred while creating the buyer user.");
    });
  } else {
    // Seller logic
    users.addSellerUser(submittedDetails).then((createdUser) => {
      console.log("Created Seller User:", createdUser);
    })
    .catch((error) => {
      console.error("Error creating seller user:", error);
      res.status(500).send("An error occurred while creating the seller user.");
    });
  }
  res.redirect("/login");
});

module.exports = router;
