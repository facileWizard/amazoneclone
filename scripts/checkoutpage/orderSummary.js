import {cart, deleteCart, upadteCart, updateDeliveryOption} from '../cart.js'
import { products } from '../products.js'
import {changePrice} from '../utils.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions} from '../../data/deliveryoption.js'
import { renderPaymentSummary } from './paymentpage.js'

export function rendercode(){
  
let html = '';
let indexProduct;

console.log(cart);
cart.forEach((items) =>{

  const deliveryoptionId = items.deliveryOptionId;
  console.log(items);
  let option;

products.forEach((product) => {
    if(product.id === items.id){
        indexProduct = product;
    }
});

deliveryOptions.forEach((delivery) => {
  if (delivery.id === deliveryoptionId){
    option = delivery;
  }
});

const today = dayjs();
console.log(option);
const deliveryDate1 = today.add(option.deliverDate, 'days')
const date = deliveryDate1.format('dddd, MMMM D');

html += 
`
<div class="cart-item-container js-cart-item-${indexProduct.id}">
<div class="delivery-date">
  Delivery date: ${date}
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${indexProduct.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${indexProduct.name}
    </div>
    <div class="product-price">
    ₹${changePrice(indexProduct.priceCents)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label">${items.qty}</span>
      </span>
      <span class="update-quantity-link link-primary js-update-cart-quantity">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-update" 
      data-id =${indexProduct.id}">
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    ${deliveryOptionHTML(indexProduct, items)}
  </div>
</div>
</div>

`

function deliveryOptionHTML(indexProduct, items){
  let deliveryHTML = '' ;
deliveryOptions.forEach((option)=>{

const today = dayjs();
const deliveryDate1 = today.add(option.deliverDate, 'days')
const date = deliveryDate1.format('dddd, MMMM D');
const priceString = option.priceCents === 0 
? 'Free - Shipping'
:  `₹${option.priceCents} - Shipping`

console.log(deliveryDate1);
 
const ischecked = option.id === items.deliveryOptionId;
deliveryHTML += 
`
  <div class="delivery-option js-delivery-option js-delivery-option"
  data-delivery-Option-Id = "${option.id}"
data-product-Id = "${indexProduct.id}">
  <input type="radio"
  ${ischecked ? 'checked' : ''}
    class="delivery-option-input"
    name="delivery-option-1-${indexProduct.id}">
  <div>
    <div class="delivery-option-date">
      ${date}
    </div>
    <div class="delivery-option-price">
      ${priceString}
    </div>
  </div>
</div>
  `
});
//console.log(deliveryHTML);
return deliveryHTML;
}
//console.log(html);
//const today = dayjs();
//const delDate = today.add(7, 'days');
//console.log(delDate.format('dddd, MMMM D'));
console.log(indexProduct);
console.log(indexProduct.name); 
});

console.log(html);

document.querySelector('.js-order-summary').innerHTML = html;
document.querySelectorAll('.js-delete-update').forEach((link) => {
  link.addEventListener('click', () =>{
    //console.log('delted');
    let variable = link.dataset.id;
    //console.log(JSON.parse(variable));
    variable = variable.substring(0, variable.length - 1)
    console.log(variable);
    deleteCart(variable);
    console.log(cart);

    console.log(document.querySelector(`.js-cart-item-${variable}`));
    document.querySelector(`.js-cart-item-${variable}`).remove();
    renderPaymentSummary()
  });
});

document.querySelectorAll('.js-update-cart-quantity').forEach((update) =>{
  update.addEventListener('click', () =>{
   //console.log(link.dataset.id);
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {

 

  element.addEventListener('click', () => {
    const {deliveryOptionId, productId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    rendercode();
    renderPaymentSummary()
  });
});
};


