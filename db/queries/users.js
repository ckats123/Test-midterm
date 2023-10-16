const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const getUserPassword = (email) => {
  return db
    .query("SELECT email, password FROM users WHERE email = $1;", [email])
    .then((data) => {
      return data.rows[0];
    });
};

const getSellerAccountInfo = (email) => {
  return db
  .query(
    "SELECT * FROM users JOIN sellers_info ON users.id = sellers_info.user_id WHERE email = $1;", [email]);
}

module.exports = { getUsers, getUserPassword, getSellerAccountInfo };

