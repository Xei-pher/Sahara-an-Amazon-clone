import {formatPricing} from '../../scripts/utils/money.js';

describe('Test Suite: formatPricing', () => {
    it('should convert cents to dollars', () => {
        expect(formatPricing(100)).toEqual('1.00');
    })

    it('works with 0 values', () => {
        expect(formatPricing(0)).toEqual('0.00');
    })

    it('rounds up to nearest cent', () => {
        expect(formatPricing(2000.5)).toEqual('20.01');
    })
});