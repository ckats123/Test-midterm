const db = require("../../connection");
// 15_view_transactions_and_review

// Get review associated with a specific transaction id
const getReview = (transactionId) => {
  const query = `SELECT r.*, listings.title, listings.id FROM reviews r JOIN transactions ON transaction_id = transactions.id JOIN listings ON listing_id = listings.id WHERE transaction_id = ${transactionId}`;
  return db.query(query).then((data) => {
    return data.rows[0];
  });
};

// Get reviews for an array of transactions
const getReviewsForMultipleTransactions = (transactionList) => {
  const reviewList = [];
  // Populates an array of promises with query results for each transaction
  const promises = transactionList.map((transaction) => {
    return getReview(transaction.id).then((review) => {
      if (review) {
        reviewList.push(review);
      }
    });
  });
  // Waits for all promises to resolve then returns array of results
  return Promise.all(promises).then(() => {
    return reviewList;
  });
};

module.exports = { getReviewsForMultipleTransactions };
