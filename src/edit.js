import { useState, useEffect, useRef, createContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

import Settings from './settings';

export const QuantityContext = createContext();

const Edit = props => {
    const { className, attributes: { width, alignment, background, textAlign, padding, border, shadow, heading, headingTypo, headingColor, maxQuantity, unitPrice, unitPriceQuery, quantityLabel, totalPriceLabel, numberTypo, labelTypo, numberLabelColor, rangeWidth, rangeTrackBG, rangeThumbBG }, setAttributes, clientId } = props;

    useEffect(() => { clientId && setAttributes({ cId: clientId }); }, [clientId]); // Set & Update clientId to cId

    const [quantity, setQuantity] = useState(250);
    const totalPriceRef = useRef(null);

    useEffect(() => {
        const sortedUnitPriceQuery = lodash.sortBy(unitPriceQuery, ['afterQuantity', 'unitPrice']);

        totalPriceRef.current.innerText = `$${(quantity * unitPrice).toFixed(2)}`;

        for (let i = 0; i < sortedUnitPriceQuery.length; i++) {
            const afterQuantity = parseFloat(sortedUnitPriceQuery[i].afterQuantity);
            const price = parseFloat(sortedUnitPriceQuery[i].unitPrice);

            if (afterQuantity <= quantity) {
                totalPriceRef.current.innerText = `$${(quantity * price).toFixed(2)}`;
            }
        }
    }, [totalPriceRef, unitPrice, unitPriceQuery, quantity]);

    const rangeTrackBGStyle = rangeTrackBG?.styles || 'background-image: radial-gradient(#70777f, #40444f);';
    const rangeThumbBGStyle = rangeThumbBG?.styles || 'background-image: radial-gradient(#70777f, #40444f);';

    return <>
        <QuantityContext.Provider value={[quantity, setQuantity]}>
            <Settings attributes={props.attributes} setAttributes={setAttributes} clientId={clientId} />
        </QuantityContext.Provider>

        <div className={className} id={`pclbPriceCalculator-${clientId}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url(${headingTypo?.googleFontLink || ''});
                @import url(${numberTypo?.googleFontLink || ''});
                @import url(${labelTypo?.googleFontLink || ''});

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
            `}} />

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