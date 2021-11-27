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

        <div className={className} id={`pcbPriceCalculator-${clientId}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url(${headingTypo?.googleFontLink || ''});
                @import url(${numberTypo?.googleFontLink || ''});
                @import url(${labelTypo?.googleFontLink || ''});

                #pcbPriceCalculator-${clientId}{
                    text-align: ${alignment};
                }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator{
                    width: ${'0px' === width || '0%' === width || '0em' === width ? 'auto' : width};
                    ${background?.styles || 'background-color: #e3edf1;'}
                    text-align: ${textAlign};
                    padding: ${padding?.styles || '25px 30px'};
                    ${border?.styles || 'border-radius: 3px;'}
                    box-shadow: ${shadow?.styles || 'none'};
                }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbHeading{
                    ${headingTypo?.styles || 'font-size: 28px;'}
                    color: ${headingColor};
                }
                
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantity, #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbTotal{
                    color: ${numberLabelColor};
                }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantity .pcbQuantityAmount, #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbTotal .pcbTotalPrice{
                    ${numberTypo?.styles || 'font-size: 20px; font-weight: 700;'}
                }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantity .pcbQuantityLabel, #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbTotal .pcbTotalLabel{
                    ${labelTypo?.styles || 'font-size: 15px;'}
                }

                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange{
                    width: ${rangeWidth}
                }

                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange:focus::-webkit-slider-runnable-track{ ${rangeTrackBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange:focus::-ms-fill-upper{ ${rangeTrackBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange:focus:focus::-ms-fill-lower{ ${rangeTrackBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange::-webkit-slider-runnable-track{ ${rangeTrackBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange::-moz-range-track{ ${rangeTrackBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange::-ms-fill-upper{ ${rangeTrackBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange::-ms-fill-lower{ ${rangeTrackBGStyle} }

                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange::-webkit-slider-thumb{ ${rangeThumbBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange::-moz-range-thumb{ ${rangeThumbBGStyle} }
                #pcbPriceCalculator-${clientId} .pcbPriceCalculator .pcbQuantityRange::-ms-thumb{ ${rangeThumbBGStyle} }
            `}} />

            <div className='pcbPriceCalculator'>
                <RichText className='pcbHeading' tagName='h2' value={heading} onChange={val => setAttributes({ heading: val })} placeholder={__('Price Calculator', 'price-calculator')} inlineToolbar />

                <div className='pcbQuantity'>
                    <RichText className='pcbQuantityLabel' tagName='label' value={quantityLabel} onChange={val => setAttributes({ quantityLabel: val })} placeholder={__('Quantity Label:', 'price-calculator')} inlineToolbar />

                    <p className='pcbQuantityAmount'>{quantity}</p>
                </div>

                <input className='pcbQuantityRange' type='range' value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} min={1} max={maxQuantity} step={1} />

                <div className='pcbTotal'>
                    <p className='pcbTotalPrice' ref={totalPriceRef}></p>

                    <RichText className='pcbTotalLabel' tagName='label' value={totalPriceLabel} onChange={val => setAttributes({ totalPriceLabel: val })} placeholder={__('Total Price', 'price-calculator')} inlineToolbar />
                </div>
            </div>
        </div>
    </>;
};
export default Edit;