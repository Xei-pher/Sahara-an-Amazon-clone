import { addToCart, cart } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    it('add a new product to cart', () => {
        spyOn
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
    });
    it('add an existing product to cart', () => {
        
    });
});