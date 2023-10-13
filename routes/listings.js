const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("listings");
});

// placeholder data

router.get("/:listing_id", (req, res) => {
  const listingId = req.params.listing_id;
  console.log('Rendering listing number ', listingId);
  const listingData =
    {
      id: 1,
      seller_id: 3,
      title: "Project Lead",
      price: 178,
      description:
        "eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo",
      date_listed: "2023-06-02",
      is_active: true,
    };

  res.render("listing_details", {listing: listingData});
});

module.exports = router;
