SELECT * FROM listings WHERE
title LIKE '%search_keyword%' OR
description LIKE '%search_keyword%' OR
seller = 'seller_username' OR
price BETWEEN min_price AND max_price;
