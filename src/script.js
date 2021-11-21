// import Sass
import './style.scss';

// AlertBox
const allPriceCalculator = document.querySelectorAll('.wp-block-pcb-price-calculator');

Object.values(allPriceCalculator).map(priceCalc => {
    const priceCalcEl = document.getElementById(priceCalc.id);
    const { unitPrice, maxQuantity } = JSON.parse(priceCalcEl.dataset.priceCalculator);

    const pcbQuantityAmount = document.querySelector(`#${priceCalc.id} .pcbPriceCalculator .pcbQuantityAmount`);
    const pcbQuantityRange = document.querySelector(`#${priceCalc.id} .pcbPriceCalculator .pcbQuantityRange`);
    const pcbTotalPrice = document.querySelector(`#${priceCalc.id} .pcbPriceCalculator .pcbTotalPrice`);

    pcbQuantityRange.value = (parseInt(maxQuantity) / 2).toFixed(0);

    function calculatePrice() {
        pcbQuantityAmount.innerText = pcbQuantityRange?.value;
        pcbTotalPrice.innerText = `$ ${(unitPrice * pcbQuantityRange.value).toFixed(2)}`;
    }
    calculatePrice();

    pcbQuantityRange.addEventListener('input', calculatePrice);
});