export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6"',
    quantity: 2
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