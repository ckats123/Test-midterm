-- view favorite items

SELECT listings.*, favorites.id AS favorite_id
FROM listings
JOIN favorites ON favorites.listing_id = listings.id
WHERE favorites.buyer_id = $1
AND listings.is_active = true
ORDER BY listings.created_at DESC;


