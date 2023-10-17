const express = require("express");
const router = express.Router();
const favorites = require("../db/queries/functions/favorites");

router.get("/", (req, res) => {
  if (req.cookies["user_id"]) {
    favorites.getFavoritesByUserId(req.cookies["user_id"]).then((favorites) => {
      console.log(favorites);
      res.render("favorites", { favorites });
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
