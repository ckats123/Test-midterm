// transaction log of both buyer and seller

const db = require("../../connection");

const getTransactionLog = (id) => {
  const query = `SELECT * FROM transactions WHERE buyer_id = $1 OR seller_id = $1`;
  return db.query(query, [id]).then((data) => {
    return data.rows;
  });
};

module.exports = { getTransactionLog };
