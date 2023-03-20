export const calculatePriceQuery = (totalPriceEl, currency, unitPrice, unitPriceQuery, quantity) => {
    const sortedUnitPriceQuery = lodash.sortBy(unitPriceQuery, ['afterQuantity', 'unitPrice']);

    totalPriceEl.innerText = `${currency}${(quantity * unitPrice).toFixed(2)}`;

    for (let i = 0; i < sortedUnitPriceQuery.length; i++) {
        const afterQuantity = parseFloat(sortedUnitPriceQuery[i].afterQuantity);
        const price = parseFloat(sortedUnitPriceQuery[i].unitPrice);

        if (afterQuantity <= quantity) {
            totalPriceEl.innerText = `${currency}${(quantity * price).toFixed(2)}`;
        }
    }
}