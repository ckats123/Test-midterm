const express = require("express");
const router = express.Router();
const listings = require("../db/queries/functions/listings");

// /listings search results page
router.get("/", (req, res) => {
  let searchTerm = req.query["search-term"] || "%";
  let searchDescription = req.query["description"] || "%";
  let searchSeller = req.query["seller-name"] || "%";
  let searchMinPrice = req.query["price-slider-min"] || 0;
  let searchMaxPrice = req.query["price-slider-max"] || 1000;

  // Non exact matching
  if (searchTerm) searchTerm = `%${searchTerm}%`;
  if (searchDescription) searchDescription = `%${searchDescription}%`;
  if (searchSeller) searchSeller = `%${searchSeller}%`;

  const completeSearchTerm = {
    searchTerm,
    searchDescription,
    searchSeller,
    searchMinPrice,
    searchMaxPrice
  }
  console.log(completeSearchTerm);

  listings
    .getListingSearchResults(completeSearchTerm)
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
      if (!listingData || listingData.length === 0) {
        // No listing data
        res.sendStatus(404);
      } else {
        // Found listing data
        res.render("listing_details", { listing: listingData[0] });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({ error: "Error fetching this listing's data" });
    });
});

module.exports = router;
