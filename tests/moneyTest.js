import {formatPricing} from '../scripts/utils/money.js';

if(formatPricing(100) === '1.00') {
    console.log("passed");
}
else {
    console.log("failed");
}

if(formatPricing(0) === '0.00') {
    console.log("passed");
}
else {
    console.log("failed");
}