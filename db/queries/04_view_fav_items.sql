SELECT l.* FROM listings l
JOIN favorites f ON l.id = f.listing_id
WHERE f.user_id = user_id;
