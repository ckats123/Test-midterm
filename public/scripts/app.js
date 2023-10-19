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
    }
  });
});

$(() => {
  $(".active-button").on('click', function() {
    const $button = $(this);
    const $listing = $button.closest('.listing-tile');

    const active = $listing.find('.active');
    const sold = $listing.find('.sold');

    if (sold.css("display") === "none") {
      console.log("SOLD!");
      sold.css("display", "block");
      active.css("display", "none");
    }
  });
});
