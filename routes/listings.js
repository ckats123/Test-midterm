const express = require("express");
const router = express.Router();
const listings = require("../db/queries/functions/listings");
const favorites = require("../db/queries/functions/users");

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
    searchMaxPrice,
  };
  console.log(completeSearchTerm);

  listings
    .getListingSearchResults(completeSearchTerm)
    .then((allListings) => {
      console.log(allListings);
      console.log(req.cookies["user_id"]);

      // Create an array of promises for isListingFavorited calls
      const isFavoritedPromises = allListings.map((listing) => {
        return favorites.isListingInFavorites(req.cookies["user_id"], listing.id);
      });

      // Wait for all promises to complete
      return Promise.all(isFavoritedPromises).then((isFavoritedResults) => {
        // Now isFavoritedResults is an array of boolean values

        // Combine the isFavorited information with each listing
        allListings.forEach((listing, index) => {
          listing.isFavorited = isFavoritedResults[index];
        });

        // Render the page with updated allListings
        console.log("Updated all listings: ", allListings)
        res.render("listings", { listings: allListings });
      });
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
