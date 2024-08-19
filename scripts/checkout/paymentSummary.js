import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/delivery.js';
export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingCents = 0;
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents +=product.priceCents * cartItem.quantity;

        const delOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingCents += delOption.priceCents;
    });

    const totalBeforeTaxCents = (productPriceCents + shippingCents);

    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    const paymentSummaryHTML = ``
}