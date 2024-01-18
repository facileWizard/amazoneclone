export let cart = JSON.parse(localStorage.getItem('cart')); 
if (!cart){
  cart = [{
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    qty: 2,
    deliveryOptionId : '1'
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    qty: 1,
    deliveryOptionId : '2'
  }];
}


export function savecartLocal(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(id){
    let qty = 1;
    let flag ;
    cart.forEach((item, index) =>{
      if(item.id === id){
        qty = item.qty + 1
        //console.log(index);
       // console.log(qty);
        item.qty = qty;
        flag = 1;
      }
    })
    if (flag === 1){}else{
    cart.push({ id: id,
    //product: productName,
    qty: qty,
  deliveryOptionId : '1'});}
  console.log(cart);
  savecartLocal();
  }
  
  export function upadteCart(){
    //console.log(cart);
    let totalItems = 0;
    cart.forEach((item) =>{
      totalItems += item.qty;
    });
    console.log(totalItems);
  
    document.querySelector('.js-update-cart').innerHTML = totalItems;
    console.log(localStorage.setItem('totalItems', totalItems));
    savecartLocal()
  }

  export function deleteCart(id){
    cart.forEach((cartProduct, index) => {
      console.log(cartProduct.id);
      if (cartProduct.id === id){
        console.log(index);
        cart.splice(index, 1);
      }
    });
    savecartLocal()
  }

  export function updateDeliveryOption(productId, deliveryId){
    let matchingItem;
    console.log(productId);
    cart.forEach((item) => {
      item
      if(item.id === productId){
        matchingItem = item;
      }
    });
  
    console.log(deliveryId);
    matchingItem.deliveryOptionId = deliveryId;
    console.log(matchingItem);
    savecartLocal();
  }