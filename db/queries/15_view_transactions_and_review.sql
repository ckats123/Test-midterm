SELECT t.*, r.* FROM transactions t
JOIN reviews r ON t.listing_id = r.listing_id
WHERE t.seller_id = $1;

-- check if transactions have buyer id 
-- join listing for transactions
-- avoid having both t.*, r.*; pick main table instead

-- notes
SELECT r.*, t.*
-- rows[0].id could be either review or transaction
---
SELECT r.id, r.date, r.description, t.id AS transaction_id
-- rows[0].id is the review id, rows[0].transaction_id 

-- change all trans_id, seller_id (aka PK) to just id 
-- can add date to favorites table as null