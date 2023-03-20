import { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

import Settings from './Settings';
import Style from './Style';
import { calculatePriceQuery } from './utils/functions';

const Edit = props => {
	const { className, attributes, setAttributes, clientId } = props;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	const { currency, maxQuantity, unitPrice, unitPriceQuery, quantityLabel, totalPriceLabel, heading } = attributes;

	const [quantity, setQuantity] = useState(parseInt(maxQuantity / 2));
	const totalPriceRef = useRef(null);

	useEffect(() => {
		quantity > maxQuantity && setQuantity(maxQuantity);
	}, [maxQuantity]);

	useEffect(() => {
		calculatePriceQuery(totalPriceRef.current, currency, unitPrice, unitPriceQuery, quantity);
	}, [totalPriceRef, unitPrice, unitPriceQuery, currency, quantity]);

	return <>
		<Settings attributes={props.attributes} setAttributes={setAttributes} />

		<div className={className} id={`pclbPriceCalculator-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<div className='pclbPriceCalculator'>
				<RichText className='pclbHeading' tagName='h2' value={heading} onChange={val => setAttributes({ heading: val })} placeholder={__('Price Calculator', 'price-calculator')} inlineToolbar />

				<div className='pclbQuantity'>
					<RichText className='pclbQuantityLabel' tagName='label' value={quantityLabel} onChange={val => setAttributes({ quantityLabel: val })} placeholder={__('Quantity Label:', 'price-calculator')} inlineToolbar />

					<p className='pclbQuantityAmount'>{quantity}</p>
				</div>

				<input className='pclbQuantityRange' type='range' value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} min={1} max={maxQuantity} step={1} />

				<div className='pclbTotal'>
					<p className='pclbTotalPrice' ref={totalPriceRef}></p>

					<RichText className='pclbTotalLabel' tagName='label' value={totalPriceLabel} onChange={val => setAttributes({ totalPriceLabel: val })} placeholder={__('Total Price', 'price-calculator')} inlineToolbar />
				</div>
			</div>
		</div>
	</>;
};
export default Edit;