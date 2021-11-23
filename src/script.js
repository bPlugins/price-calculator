// import Sass
import './style.scss';

import _, { sortBy } from 'lodash';

// Check is Lodash
const isLodash = () => {
    let isLodash = false;

    // If _ is defined and the function _.forEach exists then we know underscore OR lodash are in place
    if ('undefined' != typeof (_) && 'function' == typeof (_.forEach)) {
        // A small sample of some of the functions that exist in lodash but not underscore
        const funcs = ['get', 'set', 'at', 'cloneDeep'];

        // Simplest if assume exists to start
        isLodash = true;

        funcs.forEach(function (func) {
            // If just one of the functions do not exist, then not lodash
            isLodash = ('function' != typeof (_[func])) ? false : isLodash;
        });
    }

    if (isLodash) {
        // We know that lodash is loaded in the _ variable
        return true;
    } else {
        // We know that lodash is NOT loaded
        return false;
    }
};
if (isLodash()) {
    _.noConflict();
}

// Price Calculator
const allPriceCalculator = document.querySelectorAll('.wp-block-pcb-price-calculator');

Object.values(allPriceCalculator).map(priceCalc => {
    const priceCalcEl = document.getElementById(priceCalc.id);
    const { unitPrice, maxQuantity, unitPriceQuery } = JSON.parse(priceCalcEl.dataset.priceCalculator);

    const pcbQuantityAmount = document.querySelector(`#${priceCalc.id} .pcbPriceCalculator .pcbQuantityAmount`);
    const pcbQuantityRange = document.querySelector(`#${priceCalc.id} .pcbPriceCalculator .pcbQuantityRange`);
    const pcbTotalPrice = document.querySelector(`#${priceCalc.id} .pcbPriceCalculator .pcbTotalPrice`);

    pcbQuantityRange.value = (parseInt(maxQuantity) / 2).toFixed(0);

    function calculatePrice() {
        const quantity = parseInt(pcbQuantityRange?.value);
        pcbQuantityAmount.innerText = quantity;

        const sortedUnitPriceQuery = sortBy(unitPriceQuery, ['afterQuantity', 'unitPrice']);

        pcbTotalPrice.innerText = `$${(quantity * unitPrice).toFixed(2)}`;

        // const allQuantity = [];
        for (let i = 0; i < sortedUnitPriceQuery.length; i++) {
            const afterQuantity = parseFloat(sortedUnitPriceQuery[i].afterQuantity);
            const price = parseFloat(sortedUnitPriceQuery[i].unitPrice);
            // const lastAfterQuantity = parseFloat(sortedUnitPriceQuery[sortedUnitPriceQuery.length - 1].afterQuantity);
            // const lastPrice = parseFloat(sortedUnitPriceQuery[sortedUnitPriceQuery.length - 1].unitPrice);
            // allQuantity.push(afterQuantity);

            if (afterQuantity <= quantity) {
                pcbTotalPrice.innerText = `$${(quantity * price).toFixed(2)}`;
                // } else if (lastAfterQuantity <= quantity) {
                //     pcbTotalPrice.innerText = `$${(quantity * lastPrice).toFixed(2)}`;
                // } else if (sortedUnitPriceQuery[0].afterQuantity > quantity) {
                //     pcbTotalPrice.innerText = `$${(quantity * unitPrice).toFixed(2)}`;
            }
        }
    }
    calculatePrice();

    pcbQuantityRange.addEventListener('input', calculatePrice);
});