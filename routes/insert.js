const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");

// router.post("/:listingId", (req, res) => {
// console.log('testing', req.cookies['user_id'], req.params.listingId)
//   users.addFavorite(req.cookies["user_id"], req.params.listingId)
//   .then((favorite) => {
//     console.log("Successfully inserted new favorite entry.")
//     })
//     .catch((error) => {
//     res.status(500).json({ error: 'Failed to add to favorites.' });
//   });
// });

router.post("/:listingId", (req, res) => {
  // Check if the listing is already in the user's favorites
  users.isListingInFavorites(req.cookies['user_id'], req.params.listingId)
    .then(isntInFavorites => {
      if (isntInFavorites) {
        console.log('testing', req.cookies['user_id'], req.params.listingId);
        users.addFavorite(req.cookies["user_id"], req.params.listingId)
          .then((favorite) => {
            console.log("Successfully inserted new favorite entry.");
          })
          .catch((error) => {
            console.log("Failed to add to favorites.");
          });
      } else {
        console.log('Listing already in favorites!');
      }
    })
    .catch(error => {
      console.log("Error checking if the listing is in favorites:", error);
    });
});








module.exports = router;
