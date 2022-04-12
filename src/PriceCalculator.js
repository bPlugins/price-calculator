import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

const PriceCalculator = ({ attributes, isBackend = false, wp }) => {
	const { maxQuantity, unitPrice, unitPriceQuery, quantityLabel, totalPriceLabel, currency, heading } = attributes;

	const [quantity, setQuantity] = useState(parseInt(maxQuantity / 2));
	const totalPriceRef = useRef(null);

	useEffect(() => {
		quantity > maxQuantity && setQuantity(maxQuantity);
	}, [maxQuantity]);

	useEffect(() => {
		const sortedUnitPriceQuery = lodash.sortBy(unitPriceQuery, ['afterQuantity', 'unitPrice']);

		totalPriceRef.current.innerText = `${currency}${(quantity * unitPrice).toFixed(2)}`;

		for (let i = 0; i < sortedUnitPriceQuery.length; i++) {
			const afterQuantity = parseFloat(sortedUnitPriceQuery[i].afterQuantity);
			const price = parseFloat(sortedUnitPriceQuery[i].unitPrice);

			if (afterQuantity <= quantity) {
				totalPriceRef.current.innerText = `${currency}${(quantity * price).toFixed(2)}`;
			}
		}
	}, [totalPriceRef, unitPrice, unitPriceQuery, currency, quantity]);

	return <div className='pclbPriceCalculator'>
		{isBackend ? <RichText className='pclbHeading' tagName='h2' value={heading} onChange={val => wp.setAttributes({ heading: val })} placeholder={__('Price Calculator', 'price-calculator')} inlineToolbar /> : heading && <h2 className='pclbHeading'>{heading}</h2>}

		<div className='pclbQuantity'>
			{isBackend ? <RichText className='pclbQuantityLabel' tagName='label' value={quantityLabel} onChange={val => wp.setAttributes({ quantityLabel: val })} placeholder={__('Quantity Label:', 'price-calculator')} inlineToolbar /> : quantityLabel && <label className='pclbQuantityLabel'>{quantityLabel}</label>}

			<p className='pclbQuantityAmount'>{quantity}</p>
		</div>

		<input className='pclbQuantityRange' type='range' value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} min={1} max={maxQuantity} step={1} />

		<div className='pclbTotal'>
			<p className='pclbTotalPrice' ref={totalPriceRef}></p>

			{isBackend ? <RichText className='pclbTotalLabel' tagName='label' value={totalPriceLabel} onChange={val => wp.setAttributes({ totalPriceLabel: val })} placeholder={__('Total Price', 'price-calculator')} inlineToolbar /> : totalPriceLabel && <label className='pclbTotalLabel'>{totalPriceLabel}</label>}
		</div>
	</div>
}
export default PriceCalculator;