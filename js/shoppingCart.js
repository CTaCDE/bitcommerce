function addToCart(item_price, cart_quantity) {
	console.log(cart_quantity);
	// FIXME retrieve item price from database using ID param
	// increment cart total price
	// increment cart total items
	// fetch the element :
   var element = document.getElementById('cart_quantity');
   console.log(element); 

   // get the attribute, parse it and increment it :
   value = parseInt(element.getAttribute('cart_quantity'), 10)+1; 

   // stores the incremented value :
   element.setAttribute('cart_quantity', cart_quantity);

   // and change the innerHTML (conversion to string is implicit)
   //element.innerHTML = cart_quantity;
   return cart_quantity;

}

function printCartQuant(item_price, cart_quantity) {
	element.innerHTML = addToCart(item_price, cart_quantity);
}