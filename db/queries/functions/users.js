const db = require("../../connection");


function handleQueryError(error) {
  console.error("Database query error:", error);
  throw error; 
}

const getUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then((data) => data.rows)
    .catch(handleQueryError);
};

const getUserPassword = (email) => {
  return db
    .query("SELECT email, password FROM users WHERE email = $1;", [email])
    .then((data) => data.rows[0])
    .catch(handleQueryError);
};

const getSellerAccountInfo = (email) => {
  return db
    .query(
      "SELECT * FROM users JOIN sellers_info ON users.id = sellers_info.user_id WHERE email = $1;",
      [email],
    )
    .then((data) => data.rows)
    .catch(handleQueryError);
};

module.exports = { getUsers, getUserPassword, getSellerAccountInfo };
