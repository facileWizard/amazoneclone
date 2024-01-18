export function changePrice(price){
    return ((Math.round(price)/100)*83.08).toFixed(2);
  }