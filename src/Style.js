const Style = ({ attributes, clientId }) => {
	const { width, alignment, background, textAlign, padding, border, shadow, headingTypo, headingColor, numberTypo, labelTypo, numberLabelColor, rangeWidth, rangeTrackBG, rangeThumbBG } = attributes;

	const rangeTrackBGStyle = rangeTrackBG?.styles || 'background-image: radial-gradient(#70777f, #40444f);';
	const rangeThumbBGStyle = rangeThumbBG?.styles || 'background-image: radial-gradient(#70777f, #40444f);';

	return <style dangerouslySetInnerHTML={{
		__html: `
		${headingTypo?.googleFontLink ? `@import url(${headingTypo?.googleFontLink});` : ''}
		${numberTypo?.googleFontLink ? `@import url(${numberTypo?.googleFontLink});` : ''}
		${labelTypo?.googleFontLink ? `@import url(${labelTypo?.googleFontLink});` : ''}

		#pclbPriceCalculator-${clientId}{
			text-align: ${alignment};
		}
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator{
			width: ${'0px' === width || '0%' === width || '0em' === width ? 'auto' : width};
			${background?.styles || 'background-color: #e3edf1;'}
			text-align: ${textAlign};
			padding: ${padding?.styles || '25px 30px'};
			${border?.styles || 'border-radius: 3px;'}
			box-shadow: ${shadow?.styles || 'none'};
		}
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbHeading{
			${headingTypo?.styles || 'font-size: 28px;'}
			color: ${headingColor};
		}
		
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantity, #pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbTotal{
			color: ${numberLabelColor};
		}
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantity .pclbQuantityAmount, #pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbTotal .pclbTotalPrice{
			${numberTypo?.styles || 'font-size: 20px; font-weight: 700;'}
		}
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantity .pclbQuantityLabel, #pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbTotal .pclbTotalLabel{
			${labelTypo?.styles || 'font-size: 15px;'}
		}

		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange{
			width: ${rangeWidth}
		}

		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange:focus::-webkit-slider-runnable-track{ ${rangeTrackBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange:focus::-ms-fill-upper{ ${rangeTrackBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange:focus:focus::-ms-fill-lower{ ${rangeTrackBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange::-webkit-slider-runnable-track{ ${rangeTrackBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange::-moz-range-track{ ${rangeTrackBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange::-ms-fill-upper{ ${rangeTrackBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange::-ms-fill-lower{ ${rangeTrackBGStyle} }

		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange::-webkit-slider-thumb{ ${rangeThumbBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange::-moz-range-thumb{ ${rangeThumbBGStyle} }
		#pclbPriceCalculator-${clientId} .pclbPriceCalculator .pclbQuantityRange::-ms-thumb{ ${rangeThumbBGStyle} }
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;