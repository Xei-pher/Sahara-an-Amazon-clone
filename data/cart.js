export let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
export function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}
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
        saveCart()
}

export function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach(product => {
        cartQuantity += product.quantity;
    })
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    saveCart()
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