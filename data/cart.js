export let cart = [{
    productId: 'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
    quantity: 2
},
{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function addToCart(prodId){
    let matchItem;

        cart.forEach(prod => {
            if (prod.productId === prodId) {
                matchItem = prod;
                return;
            }
        })

        if (matchItem){
            matchItem.quantity += 1;
        }
        
        else{
        cart.push({
            productId: prodId,
            quantity: 1
        });
        }
}

export function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach(product => {
        cartQuantity += product.quantity;
    })
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

export function removeFromCart(prodId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== prodId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
}