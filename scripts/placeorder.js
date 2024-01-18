import {cart, savecartLocal} from './cart.js';
import { products } from './products.js';
import {changePrice} from './utils.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryoption.js';

export let orderHeader = JSON.parse(localStorage.getItem('orderHeader')); 
export let orderItems = JSON.parse(localStorage.getItem('orderItems')); 

export let selectedId = localStorage.getItem('selectedId');
export let order = localStorage.getItem('order');


console.log(cart);
console.log(deliveryOptions);
console.log(products);
//console.log(changePrice(10000));
let totalAfterTax = 0;

// getting date
const today = dayjs();
const date = today.format('MMMM D');
const month = today.format('MMMM');
const day = today.format('D');
let image;
let name;
let id;
let deliveryDate;
let orderHtml = '';
//console.log(date);



//random alphanumeric 8 digit
const randomAlphaNumeric = length => {
    let s = '';
    Array.from({ length }).some(() => {
      s += Math.random().toString(36).slice(2);
      return s.length >= length;
    });
    return s.slice(0, length);
  };
  
  let randomAlpha = randomAlphaNumeric(8); 

  randomAlpha += '-4c3d-4098-b42d-ac7fa62b7664';

if (cart.length != 0){
    console.log(cart);
cart.forEach((cartItem) =>{
    let days;
        deliveryOptions.forEach((options) => {
            //console.log(options.id);
            //console.log(cartItem.deliveryOptionId);
            if(options.id === cartItem.deliveryOptionId){
                //console.log(options);
                days = options.deliverDate;
                //console.log(options.priceCents);
                totalAfterTax += options.priceCents;
                console.log(totalAfterTax); 
            };
        });

        products.forEach((products) =>{
            if(products.id === cartItem.id){
                image = products.image;
                id = products.id;
                name = products.name;
                totalAfterTax += Number(changePrice(products.priceCents)) * cartItem.qty;
            }

        });
        //console.log(days);
        deliveryDate =  today.add(days, 'days')
        deliveryDate = deliveryDate.format('MMMM D');
        console.log(deliveryDate);
        console.log(image + ' ' + name);

        orderHtml += `
            <div class="product-image-container">
            <img src="${image}">
            </div>

            <div class="product-details">
            <div class="product-name">
            ${name}
            </div>
            <div class="product-delivery-date">
            Arriving on: ${deliveryDate}
            </div>
            <div class="product-quantity">
            Quantity: ${cartItem.qty}
            </div>
            <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
            </div>

            <div class="product-actions">
            <a href="tracking.html">
            <button class="track-package-button button-secondary js-tracking"
            data-id = ${id}
            data-order = ${randomAlpha}>
                Track package
            </button>
            </a>
            </div>
        `
    
        orderItems.push({
            id : id,
            image : image,
            name : name,
            deliveryDate : deliveryDate,
            qty: cartItem.qty,
            order : randomAlpha
        });

});

totalAfterTax += (totalAfterTax * 0.1);
totalAfterTax = totalAfterTax.toFixed(2); // final totalprice

console.log(totalAfterTax);
const html = `            
<div class="order-header-left-section">
<div class="order-date">
  <div class="order-header-label">Order Placed:</div>
  <div>${date}</div>
</div>
<div class="order-total">
  <div class="order-header-label">Total:</div>
  <div>₹${totalAfterTax}</div>
</div>
</div>

<div class="order-header-right-section">
<div class="order-header-label">Order ID:</div>
<div>${randomAlpha}</div>
</div>`

orderHeader.push({
    date : date,
    totalAfterTax : totalAfterTax,
    orderId: randomAlpha
});
console.log(orderHeader);
console.log(orderItems);


localStorage.setItem('orderHeader', JSON.stringify(orderHeader));
localStorage.setItem('orderItems', JSON.stringify(orderItems));


document.querySelector('.js-order-details').innerHTML = orderHtml; 
document.querySelector('.js-order-header').innerHTML = html; 

//empty cart
cart.length = 0;
console.log(cart);
savecartLocal();

//save clicked tracking page
    document.querySelectorAll('.js-tracking').forEach((button) => {
        button.addEventListener('click', () => {
           //console.log('added');
           //const productName = button.dataset.productName;
           selectedId = button.dataset.id;
           localStorage.setItem('selectedId', JSON.stringify(selectedId));
           order = button.dataset.order;
           localStorage.setItem('order', JSON.stringify(order));
           //updating items
         })
        });
};




