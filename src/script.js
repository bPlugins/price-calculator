// import Sass
import './style.scss';

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

        const sortedUnitPriceQuery = lodash.sortBy(unitPriceQuery, ['afterQuantity', 'unitPrice']);

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