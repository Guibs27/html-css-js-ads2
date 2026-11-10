// alert("Olá mundo! Carreguei o arquivo main.js com sucesso!");

// openModal = (modalId) => {
//   const modal = document.getElementById(modalId);
//   modal.style.display = "flex";
// }

function openModal(idModal) {
  const modal = document.getElementById("addStockModal");
  modal.style.display = "flex";
}

function closeModal(idModal) {
  const modal = document.getElementById("addStockModal");
  modal.style.display = "none";
}

function addStock(event) {
  event.preventDefault();
  const form = event.target;
  const stock = {
    ticker: form.stockTicker.value,
    name: form.stockName.value,
    value: parseFloat(form.stockValue.value),
    quantity: parseInt(form.stockQuantity.value)
  };
  console.log(stock);
}