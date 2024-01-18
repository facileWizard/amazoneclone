import {cart} from '../cart.js';
import { products } from '../products.js';
import { deliveryOptions } from '../../data/deliveryoption.js';
import {changePrice} from '../utils.js';

export function renderPaymentSummary(){

    let indexProduct;
    let totalPrice = 0;
    let deliveryPrice = 0;
    let totalBeforeTax = 0;
    let totalAfterTax = 0;
    let totalItems = 0;
    let tax = 0;
    let option;
    let html;

    cart.forEach((cartItem) =>{

    products.forEach((product) => {
        if(product.id === cartItem.id){
            indexProduct = product;
            totalPrice += cartItem.qty * changePrice(indexProduct.priceCents) ;
        }

    });

    deliveryOptions.forEach((delivery) => {
        if (delivery.id === cartItem.deliveryOptionId){
          option = delivery;
          deliveryPrice +=  option.priceCents;
        }
      });

totalItems += cartItem.qty;


});

console.log(totalPrice);
console.log(deliveryPrice);
totalBeforeTax = totalPrice + deliveryPrice;
totalAfterTax = ( 0.1 * totalBeforeTax ) + totalBeforeTax;
tax = 0.1 * totalBeforeTax;
console.log(totalBeforeTax);
console.log(totalAfterTax);
if (cart.length != 0){

     html = `
     <div class="payment-summary-title">
     Order Summary
   </div>

   <div class="payment-summary-row">
     <div>Items (${totalItems}):</div>
     <div class="payment-summary-money">₹${totalBeforeTax.toFixed(2)}</div>
   </div>

   <div class="payment-summary-row">
     <div>Shipping &amp; handling:</div>
     <div class="payment-summary-money">₹${deliveryPrice.toFixed(2)}</div>
   </div>

   <div class="payment-summary-row subtotal-row">
     <div>Total before tax:</div>
     <div class="payment-summary-money">₹${totalBeforeTax.toFixed(2)}</div>
   </div>

   <div class="payment-summary-row">
     <div>Estimated tax (10%):</div>
     <div class="payment-summary-money">₹${tax.toFixed(2)}</div>
   </div>

   <div class="payment-summary-row total-row">
     <div>Order total:</div>
     <div class="payment-summary-money">₹${totalAfterTax.toFixed(2)}</div>
   </div>

   <button class="place-order-button button-primary">
   <a href="placeorder.html">
     Place your order
   </button>`

   const html_checkout_header = `
   Checkout (<a class="return-to-home-link"
   href="amazon.html">${totalItems} Items</a>)`
   document.querySelector('.js-payment-summary').innerHTML = html;
   document.querySelector('.js-checkout-header').innerHTML = html_checkout_header;

};

};
