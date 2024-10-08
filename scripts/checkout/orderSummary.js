import { cart, addToCart, updateCartQuantity, removeFromCart, saveCart, updateDelOption } from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import formatPricing from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/delivery.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  let cartItems = ``
  cart.forEach(cartItem => {
      const productId = cartItem.productId;

      const matchingProduct = getProduct(productId);

      const deliveryOptionId = cartItem.deliveryOptionId;

      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const today = dayjs()
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      cartItems += `<div class="cart-item-container js-cart-item-container-${(matchingProduct.id)}">
              <div class="delivery-date js-delivery-date">
                Delivery date: ${dateString}
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
                  ${delOptionsHTML(matchingProduct, cartItem)}
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
      renderPaymentSummary();
    })
  });

  function delOptionsHTML(matchingProduct, cartItem){
  
    let html = ''
    deliveryOptions.forEach(delOption => {
      const today = dayjs()
      const deliveryDate = today.add(delOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = delOption.priceCents === 0 ? 'FREE' : `$${formatPricing(delOption.priceCents)}`;

      const isChecked = delOption.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option"
      data-product-id="${(matchingProduct.id)}" data-delivery-option-id="${(delOption.id)}">
                    <input type="radio"
                      ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${(matchingProduct.id)}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>`;
    });
    return html;
  };

  document.querySelectorAll('.js-delivery-option').forEach(button => {
    button.addEventListener('click', () => {
      const {productId, deliveryOptionId} = button.dataset;
      updateDelOption(productId, deliveryOptionId);
      console.log(cart);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}

renderOrderSummary();
renderPaymentSummary();