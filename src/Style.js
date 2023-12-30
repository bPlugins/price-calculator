import { getBackgroundCSS, getBorderCSS, getShadowCSS, getSpaceCSS, getTypoCSS } from '../../Components/utils/getCSS';

const Style = ({ attributes, clientId }) => {
	const { width, alignment, background, textAlign, padding, border, shadow, headingTypo, headingColor, numberTypo, labelTypo, numberLabelColor, rangeWidth, rangeTrackBG, rangeThumbBG } = attributes;

	const mainSl = `#pclbPriceCalculator-${clientId}`;
	const calculatorSl = `${mainSl} .pclbPriceCalculator`;
	const quantitySl = `${calculatorSl} .pclbQuantity`;
	const totalSl = `${calculatorSl} .pclbTotal`;
	const quantityRangeSl = `${calculatorSl} .pclbQuantityRange`;

	const rangeTrackBGStyle = getBackgroundCSS(rangeTrackBG);
	const rangeThumbBGStyle = getBackgroundCSS(rangeThumbBG);

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', headingTypo)?.googleFontLink}
		${getTypoCSS('', numberTypo)?.googleFontLink}
		${getTypoCSS('', labelTypo)?.googleFontLink}
		${getTypoCSS(`${calculatorSl} .pclbHeading`, headingTypo)?.styles}
		${getTypoCSS(`${quantitySl} .pclbQuantityAmount, ${totalSl} .pclbTotalPrice`, numberTypo)?.styles}
		${getTypoCSS(`${quantitySl} .pclbQuantityLabel, ${totalSl} .pclbTotalLabel`, labelTypo)?.styles}

		${mainSl}{
			text-align: ${alignment};
		}
		${calculatorSl}{
			width: ${['0px', '0%', '0em'].includes(width) ? 'auto' : width};
			${getBackgroundCSS(background)}
			text-align: ${textAlign};
			padding: ${getSpaceCSS(padding)};
			${getBorderCSS(border)}
			box-shadow: ${getShadowCSS(shadow)};
		}
		${calculatorSl} .pclbHeading{
			color: ${headingColor};
		}
		
		${quantitySl},
		${totalSl}{
			color: ${numberLabelColor};
		}

		${quantityRangeSl}{
			width: ${rangeWidth}
		}

		${quantityRangeSl}:focus::-webkit-slider-runnable-track{ ${rangeTrackBGStyle} }
		${quantityRangeSl}:focus::-ms-fill-upper{ ${rangeTrackBGStyle} }
		${quantityRangeSl}:focus:focus::-ms-fill-lower{ ${rangeTrackBGStyle} }
		${quantityRangeSl}::-webkit-slider-runnable-track{ ${rangeTrackBGStyle} }
		${quantityRangeSl}::-moz-range-track{ ${rangeTrackBGStyle} }
		${quantityRangeSl}::-ms-fill-upper{ ${rangeTrackBGStyle} }
		${quantityRangeSl}::-ms-fill-lower{ ${rangeTrackBGStyle} }

		${quantityRangeSl}::-webkit-slider-thumb{ ${rangeThumbBGStyle} }
		${quantityRangeSl}::-moz-range-thumb{ ${rangeThumbBGStyle} }
		${quantityRangeSl}::-ms-thumb{ ${rangeThumbBGStyle} }
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;