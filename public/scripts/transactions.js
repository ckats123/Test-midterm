const modal = document.getElementsByClassName("new-transaction-modal")[0];
const openForm = document.getElementById("newTransactionButton");
const closeForm = document.getElementsByClassName("closeModal")[0];

openForm.addEventListener('click', () => {
  modal.style.display = "flex";
})

closeForm.addEventListener('click', ()=>  {
  modal.style.display = "none";
})

window.addEventListener ('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})
