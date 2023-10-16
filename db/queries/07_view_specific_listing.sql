-- view infomation of a specific listing

SELECT  * FROM listings
WHERE id = $1
AND is_active = true;