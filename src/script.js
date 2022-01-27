// import Sass
import './style.scss';

// Price Calculator
document.addEventListener('DOMContentLoaded', () => {
    const allPriceCalculator = document.querySelectorAll('.wp-block-pclb-price-calculator');
    Object.values(allPriceCalculator).map(priceCalc => {
        const priceCalcEl = document.getElementById(priceCalc.id);
        const { unitPrice, maxQuantity, unitPriceQuery } = JSON.parse(priceCalcEl.dataset.priceCalculator);

        const pclbQuantityAmount = document.querySelector(`#${priceCalc.id} .pclbPriceCalculator .pclbQuantityAmount`);
        const pclbQuantityRange = document.querySelector(`#${priceCalc.id} .pclbPriceCalculator .pclbQuantityRange`);
        const pclbTotalPrice = document.querySelector(`#${priceCalc.id} .pclbPriceCalculator .pclbTotalPrice`);

        pclbQuantityRange.value = (parseInt(maxQuantity) / 2).toFixed(0);

        function calculatePrice() {
            const quantity = parseInt(pclbQuantityRange?.value);
            pclbQuantityAmount.innerText = quantity;

            const sortedUnitPriceQuery = lodash.sortBy(unitPriceQuery, ['afterQuantity', 'unitPrice']);

            pclbTotalPrice.innerText = `$${(quantity * unitPrice).toFixed(2)}`;

            // const allQuantity = [];
            for (let i = 0; i < sortedUnitPriceQuery.length; i++) {
                const afterQuantity = parseFloat(sortedUnitPriceQuery[i].afterQuantity);
                const price = parseFloat(sortedUnitPriceQuery[i].unitPrice);
                // const lastAfterQuantity = parseFloat(sortedUnitPriceQuery[sortedUnitPriceQuery.length - 1].afterQuantity);
                // const lastPrice = parseFloat(sortedUnitPriceQuery[sortedUnitPriceQuery.length - 1].unitPrice);
                // allQuantity.push(afterQuantity);

                if (afterQuantity <= quantity) {
                    pclbTotalPrice.innerText = `$${(quantity * price).toFixed(2)}`;
                    // } else if (lastAfterQuantity <= quantity) {
                    //     pclbTotalPrice.innerText = `$${(quantity * lastPrice).toFixed(2)}`;
                    // } else if (sortedUnitPriceQuery[0].afterQuantity > quantity) {
                    //     pclbTotalPrice.innerText = `$${(quantity * unitPrice).toFixed(2)}`;
                }
            }
        }
        calculatePrice();

        pclbQuantityRange.addEventListener('input', calculatePrice);

        priceCalcEl.removeAttribute('data-price-calculator');
    });
});