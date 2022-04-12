import { render } from '@wordpress/element';

import './style.scss';
import Style from './Style';
import PriceCalculator from './PriceCalculator';

// Price Calculator
document.addEventListener('DOMContentLoaded', () => {
	const allPriceCalculator = document.querySelectorAll('.wp-block-pclb-price-calculator');
	allPriceCalculator.forEach(priceCalculator => {
		const attributes = JSON.parse(priceCalculator.dataset.attributes);

		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<PriceCalculator attributes={attributes} />
		</>, priceCalculator);

		priceCalculator?.removeAttribute('data-attributes');
	});
});