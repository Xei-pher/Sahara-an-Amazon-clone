import { cart, addToCart, updateCartQuantity, removeFromCart, saveCart } from '../data/cart.js';
import {products} from '../data/products.js';
import formatPricing from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


let cartItems = ``
cart.forEach(cartItem => {
    const now = dayjs();
    const nxtday = now.add(1, 'day');
    const thirdday = now.add(3, 'day');
    const oneweek = now.add(7, 'day');
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })
    cartItems += `<div class="cart-item-container js-cart-item-container-${(matchingProduct.id)}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatPricing(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${(cartItem.quantity)}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-item" data-product-id="${(matchingProduct.id)}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${(matchingProduct.id)}">
                  <div>
                    <div class="delivery-option-date">
                      ${oneweek.format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${(matchingProduct.id)}">
                  <div>
                    <div class="delivery-option-date">
                      ${thirdday.format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${(matchingProduct.id)}">
                  <div>
                    <div class="delivery-option-date">
                      ${nxtday.format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
});
document.querySelector('.js-order-summary').innerHTML = cartItems

document.querySelectorAll('.js-delete-item').forEach(button => {
  button.addEventListener('click', () => {
    const prodId = button.dataset.productId;
    removeFromCart(prodId);
    document.querySelector('.js-order-summary').removeChild(document.querySelector(`.js-cart-item-container-${prodId}`));
    saveCart();
  })
})