const express = require("express");
const router = express.Router();
const users = require("../db/queries/functions/users");

router.post("/:listingId", (req, res) => {
console.log('testing', req.params.listingId)
  users.updateActiveListing(req.params.listingId)
  .then((update) => {
    console.log("Successfully updated listing to not active")
    })
    .catch((error) => {
    res.status(500).json({ error: 'Failed to update.' });
  });
});

module.exports = router;
