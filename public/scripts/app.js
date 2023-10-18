// Client facing scripts here

// Favorite button
$(() => {
  $(".favorite-button").on('click', function() {
    const $button = $(this);
    const $listing = $button.closest('.listing-tile'); // Find the closest parent with class "listing-tile"

    const heart = $listing.find('.fa-solid');
    const add = $listing.find('.add');
    const added = $listing.find('.added');

    if (added.css("display") === "none") {
      console.log("Favorited!");
      added.css("display", "block");
      add.css("display", "none");
      heart.css("color", "#f6836b");
    } else if (added.css("display") === "block") {
      console.log("Unfavorited...fine, whatever.");
      added.css("display", "none");
      add.css("display", "block");
      heart.css("color", "white");
    }
  });
});
