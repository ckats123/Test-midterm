SELECT * FROM listings
JOIN users u ON listings.seller_id = users.id
WHERE
(title ILIKE '%search_keyword%' OR
u.name ILIKE '%search_keyword%' OR
description ILIKE '%search_keyword%') AND
price BETWEEN min_price AND max_price;


-- change to users.name in ERD of users