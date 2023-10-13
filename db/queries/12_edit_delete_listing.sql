UPDATE listings SET is_active = false WHERE id = listing_id;

UPDATE listings SET title = 'new_title', price = new_price, description = 'new_description' WHERE id = listing_id;
-- To delete listing
DELETE FROM listings WHERE id = listing_id;
