// listings.js

const db = require("../../connection");

// GET functions
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
  const query = `SELECT listings.*, users.name, users.email, sellers_info.photo_url FROM listings
  JOIN users ON seller_id = users.id
  JOIN sellers_info ON sellers_info.user_id = users.id
  WHERE listings.id=$1`;
  return db.query(query, [id]).then((data) => {
    return data.rows;
  });
};

const getListingSearchResults = (completedSearchTerm) => {
  console.log(completedSearchTerm);
  query = `
  SELECT listings.*, users.name, sellers_info.photo_url FROM listings
  JOIN users ON seller_id = users.id
  JOIN sellers_info ON sellers_info.user_id = users.id
  WHERE title ILIKE $1
  AND description ILIKE $2
  AND users.name ILIKE $3
  AND price BETWEEN $4 and $5
  LIMIT 12;
  `;
  return db
    .query(query, [
      completedSearchTerm.searchTerm,
      completedSearchTerm.searchDescription,
      completedSearchTerm.searchSeller,
      completedSearchTerm.searchMinPrice,
      completedSearchTerm.searchMaxPrice,
    ])
    .then((data) => {
      return data.rows;
    });
};

// const getListingSearchResults = (term) => {
//   query = `
//     SELECT * FROM listings
//     JOIN users ON seller_id = users.id
//     JOIN sellers_info ON sellers_info.user_id = users.id
//     WHERE title LIKE '%${term}%'
//     LIMIT 12`;
//   return db.query(query).then((data) => {
//     return data.rows;
//   });
// };

const getListingsBySeller = (seller_id) => {
  console.log(`Querying ${seller_id}`);
  const query = `
    SELECT * FROM listings
    WHERE seller_id = ${seller_id}`;
  return db.query(query).then((data) => {
    return data.rows;
  });
};

// POST functions
// id (serialized), seller_id (from cookies), title, price, description, date_listed (today), is_active (default true)
const createNewListing = (
  seller_id,
  item_title,
  item_price,
  item_description
) => {
  const today = new Date();
  const query = `INSERT INTO listings (seller_id, title, price, description, date_listed)
  VALUES ($1, $2, $3, $4, $5);`;
  return db
    .query(query, [seller_id, item_title, item_price, item_description, today])
    .then((data) => {
      // don't need this, will remove
      return data.rows;
    });
};

const deleteListing = (listingId) => {
  const query = `UPDATE listings SET is_deleted = true WHERE id = $1`
  return db
    .query(query, [listingId])
    .then (() => {
      console.log("Successfully deleted listing ", listingId)
    })
}

module.exports = {
  getAllListings,
  getListingById,
  getListingSearchResults,
  getListingsBySeller,
  createNewListing,
  deleteListing
};
