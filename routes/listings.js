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



// moved kenny's ejs logic to this file, as it was crashing listings.ejs, even when commented out 

// <% listings.forEach(listing => { %>
//   <div class="listing-tile" style = "border: 1px solid black; margin: 5px; padding:5px">
//     <img src = <%= listing.photo_url %>>
//     <h2><%= listing.title %></h2>
//     <p>Price: $<%= listing.price %></p>
//     <p>Description: <%= listing.description %></p>
//     <p>Details: <a href="/listings/<%= listing.id %>">Read more</a></p>
//     <p>Date Listed: <%= listing.date_listed %></p>
//     <p>Is Active: <%= listing.is_active ? 'Yes' : 'No' %></p>
//   </div>
// <% }); %>

module.exports = router;
