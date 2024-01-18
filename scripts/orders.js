import {orderHeader, orderItems} from '../scripts/placeorder.js';
import {cart} from '../scripts/cart.js';


console.log(orderHeader);
console.log(orderItems);
console.log(cart);
let noofitems = 0;

cart.forEach((cartItem) =>{
noofitems += cartItem.qty;
});


let orderHtml = '';

orderHeader.forEach((order) =>{

   orderHtml += `<div class="order-container">`;
   orderHtml += `
    <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${order.date}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>₹${order.totalAfterTax}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${order.orderId}</div>
    </div>
  </div>
    `

    orderHtml += `<div class="order-details-grid">`

    orderItems.forEach((items) =>{

        if(items.order === order.orderId){
        orderHtml +=`
        <div class="product-image-container">
              <img src=${items.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
                ${items.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${items.deliveryDate}
              </div>
              <div class="product-quantity">
                ${items.qty}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary js-tracking-orders"
                data-id = ${items.id}
                data-order-id = ${order.orderId}>
                  Track package
                </button>
              </a>
            </div>
            
        `
        };
    });

    orderHtml += `</div>`;
    orderHtml += `</div>`;
});

//console.log(orderHtml);

document.querySelector('.js-order-html').innerHTML = orderHtml;
document.querySelector('.js-noofitems').innerHTML = noofitems;

     

//save clicked tracking page
