const db = require("../../connection");

const postNewTransaction = (
  listing_id,
  buyer_id,
  purchase_date,
  final_cost
) => {
  const query = `
  INSERT INTO transactions (listing_id, buyer_id, purchase_date, final_cost)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  return db
    .query(query, [listing_id, buyer_id, purchase_date, final_cost])
    .then((result) => {
      const createdTransaction = result.rows[0];
      return createdTransaction;
    });
};

module.exports = {
  postNewTransaction,
};
