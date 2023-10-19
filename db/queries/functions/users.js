const db = require("../../connection");

function handleQueryError(error) {
  console.error("Database query error:", error);
  throw error;
}

// GET requests
const getUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then((data) => data.rows)
    .catch(handleQueryError);
};

const getUserByEmail = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1;", [email])
    .then((data) => data.rows[0])
    .catch(handleQueryError);
};

const getUserPassword = (email) => {
  return db
    .query("SELECT * FROM users WHERE email = $1;", [email])
    .then((data) => data.rows[0])
    .catch(handleQueryError);
};

const getSellerAccountInfo = (email) => {
  return db
    .query(
      "SELECT * FROM users JOIN sellers_info ON users.id = sellers_info.user_id WHERE email = $1;",
      [email]
    )
    .then((data) => data.rows)
    .catch(handleQueryError);
};

// POST requests
const addBuyerUser = (submittedDetails) => {
  console.log("Running buyer logic now.", submittedDetails);
  const query = `INSERT INTO users (username, password, name, email, is_seller) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  return db
    .query(query, [
      submittedDetails.username,
      submittedDetails.password,
      submittedDetails.name,
      submittedDetails.email,
      false,
    ])
    .then((createdUser) => {
      return createdUser.rows[0];
    });
};

const addFavorite = (user_id, listing_id) => {
  console.log("Adding to your favorites list!");
  const query = `INSERT INTO favorites (user_id, listing_id) VALUES ($1, $2);`;
  return db.query(query, [user_id, listing_id])
};

// Still working on figuring this one out...
const isListingInFavorites = (user_id, listing_id) => {
  const query = `
    SELECT id FROM favorites WHERE user_id = $1 AND listing_id = $2;`;
  return db.query(query, [user_id, listing_id])
    .then(result => {
      return result.rows.length === 0; // Return true when there are no matching rows
    });
};


const addSellerUser = (submittedDetails) => {
  console.log("Running seller logic now.", submittedDetails);
  const query = `INSERT INTO users (username, password, name, email, is_seller) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
  return db
    .query(query, [
      submittedDetails.username,
      submittedDetails.password,
      submittedDetails.name,
      submittedDetails.email,
      true,
    ])
    .then((createdUser) => {
      console.log(createdUser);
      const userId = createdUser.rows[0].id;
      const sellerTableQuery = `INSERT INTO sellers_info (user_id, photo_url, location) VALUES ($1, $2, $3) RETURNING *;`;
      return db.query(sellerTableQuery, [
        userId,
        submittedDetails.photo_url,
        submittedDetails.location,
      ]);
    });
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserPassword,
  getSellerAccountInfo,
  addBuyerUser,
  addSellerUser,
  addFavorite,
  isListingInFavorites
};
