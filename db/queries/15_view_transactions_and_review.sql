SELECT t.*, r.* FROM transactions t
LEFT JOIN reviews r ON t.listing_id = r.listing_id
WHERE t.seller_id = user_id;
