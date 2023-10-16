const express = require("express");
const router = express.Router();
const listings = require("../db/queries/listings");

// /listings search results page
router.get("/", (req, res) => {
  let searchTerm = req.query['search-term'] || "";

  listings
    .getListingSearchResults(searchTerm)
    .then((allListings) => {
      res.render("listings", { listings: allListings });
    })
    .catch((error) => {
      console.log(error);
      res.send({ error: "Error fetching all listings" });
    });
});

// /listings/id
router.get("/:listing_id", (req, res) => {
  const listingId = req.params.listing_id;
  listings
    .getListingById(listingId)
    .then((listingData) => {
      console.log(listingData);
      res.render("listing_details", { listing: listingData[0] });
    })
    .catch((error) => {
      console.log(error);
      res.send({ error: "Error fetching this listing's data" });
    });
});

module.exports = router;
