import {cart} from '../scripts/cart.js';
import { selectedId, order } from './placeorder.js';
import { orderItems } from './placeorder.js';


console.log(cart);
console.log(selectedId);
console.log(orderItems);
console.log(order);
let currentOrder;
let currentId;

let html = '';

let totalItems = 0;
cart.forEach((items) =>{
    totalItems += items.qty;
});

orderItems.forEach ((items) =>{
    currentId = '"' + items.id + '"';
    currentOrder = '"' + items.order + '"';
    if (currentOrder === order && currentId === selectedId){
        console.log(items);
    html += `
    <a class="back-to-orders-link link-primary" href="orders.html">
    View all orders
    </a>
    
    <div class="delivery-date">
    Arriving on ${items.deliveryDate}
    </div>
    
    <div class="product-info">
    ${items.name}
    </div>
    
    <div class="product-info">
    Quantity: ${items.qty}
    </div>
    
    <img class="product-image" src=${items.image}>
    
    <div class="progress-labels-container">
    <div class="progress-label">
      Preparing
    </div>
    <div class="progress-label current-status">
      Shipped
    </div>
    <div class="progress-label">
      Delivered
    </div>
    </div>
    
    <div class="progress-bar-container">
    <div class="progress-bar"></div>
    </div>
    `;
};
});
document.querySelector('.js-total-items').innerHTML = totalItems;


console.log(html);
document.querySelector('.js-tracking').innerHTML = html;
