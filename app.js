import { products } from './products.js';
import { addToCard, clearCart } from './cart.js';


let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});


function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="img/${value.image}">
      <div class="title">${value.name}</div>
      <div class="price">${value.price.toLocaleString()}</div>
      <div id="cartbtn">
        <button class="addToCartBtn">Add To Cart</button>
        <div class="count"></div>
      </div>`;

    const addToCartBtn = newDiv.querySelector('.addToCartBtn');
    const countElement = newDiv.querySelector('.count');

    addToCartBtn.addEventListener('click', () => {
      let count = addToCard(key, listCard, total, quantity);
    });

    list.appendChild(newDiv);
  });
}

initApp();

clearCartBtn.addEventListener('click', () => {
  clearCart(listCard, total);
});
