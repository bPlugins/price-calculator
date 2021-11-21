import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

import Settings from './settings';

const Edit = props => {
    const { className, attributes: { width, alignment, background, textAlign, padding, border, shadow, heading, headingTypo, headingColor, unitPrice, maxQuantity, quantityLabel, totalPriceLabel, numberTypo, labelTypo, numberLabelColor }, setAttributes, clientId } = props;

    useEffect(() => { clientId && setAttributes({ cId: clientId }); }, [clientId]); // Set & Update clientId to cId

    const [quantity, setQuantity] = useState(250);

    return <>
        <Settings settings={props} />

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
                    padding: ${padding?.styles || '15px 30px'};
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
            `}} />

            <div className='pcbPriceCalculator'>
                <RichText className='pcbHeading' tagName='h2' value={heading} onChange={val => setAttributes({ heading: val })} placeholder={__('Price Calculator', 'price-calculator')} inlineToolbar />

                <div className='pcbQuantity'>
                    <RichText className='pcbQuantityLabel' tagName='label' value={quantityLabel} onChange={val => setAttributes({ quantityLabel: val })} placeholder={__('Quantity Label:', 'price-calculator')} inlineToolbar />

                    <p className='pcbQuantityAmount'>{quantity}</p>
                </div>

                <input className='pcbQuantityRange' type='range' value={quantity} onChange={e => setQuantity(e.target.value)} min={1} max={maxQuantity} step={1} />

                <div className='pcbTotal'>
                    <p className='pcbTotalPrice'>${(quantity * unitPrice).toFixed(2)}</p>

                    <RichText className='pcbTotalLabel' tagName='label' value={totalPriceLabel} onChange={val => setAttributes({ totalPriceLabel: val })} placeholder={__('Total Price', 'price-calculator')} inlineToolbar />
                </div>
            </div>
        </div>
    </>;
};
export default Edit;