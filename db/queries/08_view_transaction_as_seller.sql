-- view log of previous transactions

SELECT transactions.*, listings.title, listings.price, listings.seller_id, listings.buyer_id
FROM transactions
JOIN listings ON listings.id = transactions.listing_id
WHERE transactions.seller_id = $1
OR transactions.buyer_id = $1
ORDER BY transactions.created_at DESC;
;