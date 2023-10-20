// transaction log of both buyer and seller

const db = require("../../connection");



const getSellerTransactionLog = (id) => {
  const query = `SELECT transactions.*, seller_id, reviews.*
  FROM transactions
  JOIN listings ON listing_id = listings.id
  JOIN users ON seller_id = users.id
  LEFT JOIN reviews ON transactions.id = reviews.transaction_id
  WHERE seller_id = $1`;
  return db.query(query, [id]).then((data) => {
    return data.rows;
  });
};

const getBuyerTransactionLog = (id) => {
  const query = `SELECT transactions.*, seller_id, reviews.*
  FROM transactions
  JOIN listings ON listing_id = listings.id
  JOIN users ON seller_id = users.id
  LEFT JOIN reviews ON transactions.id = reviews.transaction_id
  WHERE buyer_id = $1`;
  return db.query(query, [id]).then((data) => {
    return data.rows;
  });
};


module.exports = { getSellerTransactionLog, getBuyerTransactionLog };
