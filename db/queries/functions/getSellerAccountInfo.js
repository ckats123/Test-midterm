// getSellerAccountInfo.js

const db = require("../../connection");

const getSellerAccountInfo = (sellerid) => {
  return db
    .query(
      "SELECT SELECT users.name, users.email, users.is_seller, sellers_info.photo_url, sellers_info.location FROM users JOIN sellers_info ON users.user_id = sellers_info.seller_id WHERE users.is_seller = true AND users.user_id = $1;",
      [sellerid],
    )
    .then((data) => data.rows[0])
    .catch(handleQueryError);
};

module.exports = { getSellerAccountInfo };
