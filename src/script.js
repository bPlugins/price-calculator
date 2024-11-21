import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import './style.scss';
import Style from './Components/Common/Style';
import { calculatePriceQuery } from './utils/functions';

document.addEventListener('DOMContentLoaded', () => {
	const priceCalculatorEls = document.querySelectorAll('.wp-block-pclb-price-calculator');
	priceCalculatorEls.forEach(priceCalculatorEl => {
		const attributes = JSON.parse(priceCalculatorEl.dataset.attributes);

		createRoot(priceCalculatorEl).render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<PriceCalculator attributes={attributes} />
		</>);

		priceCalculatorEl?.removeAttribute('data-attributes');
	});
});

const PriceCalculator = ({ attributes }) => {
	const { currency, maxQuantity, unitPrice, unitPriceQuery, quantityLabel, totalPriceLabel, heading } = attributes;

	const [quantity, setQuantity] = useState(parseInt(maxQuantity / 2));
	const totalPriceRef = useRef(null);

	useEffect(() => {
		calculatePriceQuery(totalPriceRef.current, currency, unitPrice, unitPriceQuery, quantity);
	}, [totalPriceRef, unitPrice, unitPriceQuery, currency, quantity]);

	return <div className='pclbPriceCalculator'>
		{heading && <h2 className='pclbHeading' dangerouslySetInnerHTML={{ __html: heading }} />}

		<div className='pclbQuantity'>
			{quantityLabel && <label className='pclbQuantityLabel' dangerouslySetInnerHTML={{ __html: quantityLabel }} />}

			<p className='pclbQuantityAmount'>{quantity}</p>
		</div>

		<input className='pclbQuantityRange' type='range' value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} min={1} max={maxQuantity} step={1} />

		<div className='pclbTotal'>
			<p className='pclbTotalPrice' ref={totalPriceRef}></p>

			{totalPriceLabel && <label className='pclbTotalLabel' dangerouslySetInnerHTML={{ __html: totalPriceLabel }} />}
		</div>
	</div>
}