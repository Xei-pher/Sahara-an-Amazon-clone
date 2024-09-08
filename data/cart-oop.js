function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
    
        loadFromStorage(){
            this.cartItems = localStorage.getItem(localStorageKey) ? JSON.parse(localStorage.getItem(localStorageKey)) : [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }];
        },
    
        saveCart(){
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        
        addToCart(prodId){
            let matchItem;
        
            this.cartItems.forEach(prod => {
                    if (prod.productId === prodId) {
                        matchItem = prod;
                        return;
                    }
                })
        
                if (matchItem){
                    matchItem.quantity += 1;
                }
                
                else{
                    this.cartItems.push({
                    productId: prodId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
                }
                this.saveCart();
        },
    
        updateCartQuantity(){
            let cartQuantity = 0;
            this.cartItems.forEach(product => {
                cartQuantity += product.quantity;
            })
            document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
            this.saveCart();
        },
    
        removeFromCart(prodId){
            const newCart = [];
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== prodId) {
                    newCart.push(cartItem);
                }
            });
        
            this.cartItems = newCart;
        },
    
        updateDelOption(productId, deliveryOptionId){
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    matchingItem = cartItem
                }
            });
        
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveCart();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('business-cart');
cart.loadFromStorage();
businessCart.loadFromStorage();
cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
console.log(cart.cartItems);
console.log(businessCart.cartItems);


