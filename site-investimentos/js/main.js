let stockBeingEdited = null;

function openModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.style.display = 'none';
  }
}

function addStock(event) {
  event.preventDefault();
  const form = event.target;

  const stock = {
    ticker: form.stockTicker.value.toUpperCase(),
    name: form.stockName.value,
    value: parseFloat(form.stockValue.value),
    quantity: parseInt(form.stockQuantity.value)
  };

  const stockList = document.getElementById('stockList');
  
  stockList.innerHTML += `
    <div class="stockCard">
      <div class="stockHeader">
        <div>
          <h2>${stock.ticker}</h2>
          <span>${stock.name}</span>
        </div>
        <div>
          <span class="stockValue up">US$ ${stock.value.toFixed(2)}</span>
        </div>
      </div>
      <div class="stockDetails">
        <span><b>${stock.quantity}</b> ações</span>
        <div>
          <span>Total</span>
          <span class="stockValue">US$ ${(stock.value * stock.quantity).toFixed(2)}</span>
        </div>
      </div>
      <div class="stockActions">
        <button class="button" onclick="loadEditForm(this)">Editar</button>
        <button class="button" onclick="removeStock(this)">Excluir</button>
      </div>
    </div>
  `;

  // form.reset();
  closeModal('addStockModal');
}

function loadEditForm(buttonEdit) {
  const stockCard = buttonEdit.closest('.stockCard');
  stockBeingEdited = stockCard;

  const stock = {
    ticker: stockCard.querySelector('h2').textContent,
    name: stockCard.querySelector('.stockHeader span').textContent,
    value: parseFloat(stockCard.querySelector('.stockValue').textContent.replace('US$ ', '')),
    quantity: parseInt(stockCard.querySelector('.stockDetails b').textContent)
  };

  const editForm = document.getElementById('editStockForm');
  editForm.stockTicker.value = stock.ticker;
  editForm.stockName.value = stock.name;
  editForm.stockValue.value = stock.value;
  editForm.stockQuantity.value = stock.quantity;

  openModal('editStockModal');
}

function saveEdit(event) {
  event.preventDefault();
  const form = event.target;

  const value = parseFloat(form.stockValue.value);
  const quantity = parseInt(form.stockQuantity.value);

  stockBeingEdited.querySelector('h2').textContent = form.stockTicker.value.toUpperCase();
  stockBeingEdited.querySelector('.stockHeader span').textContent = form.stockName.value;
  stockBeingEdited.querySelector('.stockHeader .stockValue').textContent = `US$ ${value.toFixed(2)}`;
  stockBeingEdited.querySelector('.stockDetails b').textContent = quantity;
  stockBeingEdited.querySelector('.stockDetails .stockValue').textContent = `US$ ${(value * quantity).toFixed(2)}`;

  closeModal('editStockModal');
}

function removeStock(cardButton) {
  const stockCard = cardButton.closest('.stockCard');
  stockCard.remove();
}