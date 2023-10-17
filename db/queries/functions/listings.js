// listings.js

const db = require("../../connection");

const getAllListings = () => {
  const query = `
    SELECT * FROM listings
    JOIN users on seller_id = users.id
    JOIN sellers_info ON sellers_info.user_id = users.id
    LIMIT 12`;
  return db.query(query).then((data) => {
    return data.rows;
  });
};

const getListingById = (id) => {
  const query = "SELECT * FROM listings WHERE id=$1";
  return db.query(query, [id]).then((data) => {
    return data.rows;
  });
};

const getListingSearchResults = (term) => {
  query = `
    SELECT * FROM listings
    JOIN users ON seller_id = users.id
    JOIN sellers_info ON sellers_info.user_id = users.id
    WHERE title ILIKE '%${term}%'
    LIMIT 12`;
  return db.query(query).then((data) => {
    return data.rows;
  });
};

module.exports = { getAllListings, getListingById, getListingSearchResults };
