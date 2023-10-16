SELECT * FROM listings
WHERE is_active = true
AND (title ILIKE '%' || search || '%'
OR description ILIKE '%' || search || '%')
ORDER BY created_at DESC;
