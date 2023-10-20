function openReviewModal(transactionId) {
  const modal = document.getElementById("review-modal");
  const closeForm = document.getElementsByClassName("close-review-modal")[0];

  modal.style.display = "flex";
  const transactionIdInput = document.getElementById("transactionId");
  transactionIdInput.value = transactionId;
}

function closeReviewModal() {
  const modal = document.getElementById("review-modal");
  modal.style.display = "none";
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("review-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
