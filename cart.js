import { products } from './products.js';

const listCards = [];

export function addToCard(key, listCard, total, quantity) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  } else {
    listCards[key].quantity += 1;
  }
  reloadCard(listCard, total, quantity);

  return listCards[key].quantity; 
}

function reloadCard(listCard, totalElement, quantityElement) {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice += value.price;
      count += value.quantity;

      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="img/${value.image}" /></div>
        <div>${value.name}</div>
        <div>${value.price.toLocaleString()}</div>
        <div class="quantity-container">
          <button class="decrementBtn">-</button>
          <div class="count">${value.quantity}</div>
          <button class="incrementBtn">+</button>
        </div>`;

      const decrementBtn = newDiv.querySelector('.decrementBtn');
      const incrementBtn = newDiv.querySelector('.incrementBtn');
      const countElement = newDiv.querySelector('.count');

      decrementBtn.addEventListener('click', () => {
        changeQuantity(key, value.quantity - 1, listCard, totalElement, quantityElement);
        countElement.textContent = value.quantity;
      });

      incrementBtn.addEventListener('click', () => {
        changeQuantity(key, value.quantity + 1, listCard, totalElement, quantityElement);
        countElement.textContent = value.quantity;
      });

      listCard.appendChild(newDiv);
    }
  });

  totalElement.innerText = totalPrice.toLocaleString();
  quantityElement.innerText = count;
}


function changeQuantity(key, quantity, listCard, totalElement, quantityElement) {
  let updatedQuantity = 0;

  if (quantity === 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
    updatedQuantity = listCards[key].quantity;
  }

  reloadCard(listCard, totalElement, quantityElement);
  return updatedQuantity; 
}

export function clearCart(listCard, totalElement) {
  listCards.length = 0;
  listCard.innerHTML = '';
  totalElement.innerText = '0'; 
}
