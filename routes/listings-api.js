const express = require('express');
const router  = express.Router();
const listingQueries = require('../db/queries/functions/listings');

router.get('/', (req, res) => {
  listingQueries.getAllListings()
    .then(listings => {
      res.json({ listings });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
