const db = require("../../connection");

const getFavoritesByUserId = (userId) => {
  const query = `
    SELECT * FROM favorites
    JOIN listings ON listing_id = listings.id
    JOIN users ON seller_id = users.id
    JOIN sellers_info ON users.id = sellers_info.user_id
    WHERE favorites.user_id = ${userId}`;
  return db.query(query).then((data) => {
    return data.rows;
  });
};

const isListingFavorited = (userId, listingId ) => {
  const query = `
  SELECT * FROM favorites
  WHERE user_id = $1
  AND listing_id = $2
  `
  return db.query(query, [userId, listingId]).then ((data) => {
    return data.rows;
  })
}

module.exports = { getFavoritesByUserId, isListingFavorited };
