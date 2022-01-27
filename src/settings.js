import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, RangeControl, Button, Dashicon, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';

// Variables
import Title from '../../Components/Title';
import Background from '../../Components/Background';
import BColor from '../../Components/BColor';
import SpaceControl from '../../Components/SpaceControl';
import BorderControl from '../../Components/BorderControl';
import ShadowControl from '../../Components/ShadowControl';
import Typography from '../../Components/Typography';
import options from './Const/options';
const { pxUnit, perUnit, emUnit } = options;

import icons from './Const/icons';

import { QuantityContext } from './edit';

const Settings = ({ attributes, setAttributes }) => {
    const { width, alignment, background, textAlign, padding, border, shadow, headingTypo, headingColor, maxQuantity, unitPrice, unitPriceQuery, numberTypo, labelTypo, numberLabelColor, rangeWidth, rangeTrackBG, rangeThumbBG } = attributes;

    const [quantity, setQuantity] = useContext(QuantityContext);

    const addPrice = () => {
        setAttributes({
            unitPriceQuery: [...unitPriceQuery, {
                afterQuantity: 100,
                unitPrice: 30
            }]
        });
    }

    const updatePrice = (index, type, val, otherType = false) => {
        const newUnitPriceQuery = [...unitPriceQuery];

        if (otherType) {
            newUnitPriceQuery[index][type][otherType] = val;
            setAttributes({ unitPriceQuery: newUnitPriceQuery });
        } else {
            newUnitPriceQuery[index][type] = val;
            setAttributes({ unitPriceQuery: newUnitPriceQuery });
        }
    }

    return <>
        <InspectorControls>
            <PanelBody className='bPlPanelBody addRemoveItems' title={__('Price Calculator Settings', 'price-calculator')}>
                <NumberControl label={__('Max Quantity:', 'price-calculator')} labelPosition='left' value={maxQuantity} onChange={val => {
                    setAttributes({ maxQuantity: parseInt(val) });
                    quantity > maxQuantity && setQuantity(parseInt(val));
                }} />

                <Title>{__('Per Unit Price', 'price-calculator')}</Title>
                <RangeControl value={unitPrice} onChange={val => setAttributes({ unitPrice: val })} min={0} max={1000} step={0.01} />

                {unitPriceQuery.map((item, index) => {
                    const { afterQuantity, unitPrice } = item;

                    return <PanelBody key={index} className='bPlPanelBody editItem' title={__(`Unit Price ${index + 1}:`, 'price-calculator')} initialOpen={0 !== index ? false : true}>
                        <NumberControl label={__('After Quantity:', 'price-calculator')} labelPosition='left' value={afterQuantity} onChange={val => updatePrice(index, 'afterQuantity', parseInt(val))} />

                        <NumberControl label={__('Unit Price:', 'price-calculator')} labelPosition='left' className='mt15' value={unitPrice} onChange={val => updatePrice(index, 'unitPrice', parseFloat(val))} />

                        <PanelRow className='itemAction mt20'>
                            <Button className='removeItem' label={__('Remove', 'price-calculator')} onClick={e => {
                                e.preventDefault();
                                setAttributes({ unitPriceQuery: [...unitPriceQuery.slice(0, index), ...unitPriceQuery.slice(index + 1)] });
                            }} ><Dashicon icon='no' size={18} />{__('Remove', 'price-calculator')}</Button>

                            <Button className='duplicateItem' label={__('Duplicate', 'price-calculator')} onClick={e => {
                                e.preventDefault();
                                setAttributes({ unitPriceQuery: [...unitPriceQuery, unitPriceQuery[index]] });
                            }} >{icons.gearSettings}{__('Duplicate', 'price-calculator')}</Button>
                        </PanelRow>
                    </PanelBody>
                })}

                <div className='addItem'>
                    <Button label={__('Add New Price', 'price-calculator')} onClick={addPrice}><Dashicon icon='plus' size={23} />{__('Add New Price', 'price-calculator')}</Button>
                </div>
            </PanelBody>


            <PanelBody className='bPlPanelBody' title={__('Price Calculator Style', 'price-calculator')} initialOpen={false}>
                <UnitControl label={__('Width:', 'price-calculator')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit, perUnit, emUnit]} />
                <small>{__('Keep width 0, to auto width.', 'price-calculator')}</small>

                <Background label={__('Background', 'price-calculator')} background={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#e3edf1' }} />

                <SpaceControl className='mt20' label={__('Padding:', 'price-calculator')} space={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '25px', horizontal: '30px' }} />

                <BorderControl label={__('Border:', 'price-calculator')} border={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '3px' }} />

                <ShadowControl label={__('Shadow:', 'price-calculator')} shadow={shadow} onChange={val => setAttributes({ shadow: val })} />
            </PanelBody>


            <PanelBody className='bPlPanelBody' title={__('Heading Style', 'price-calculator')} initialOpen={false}>
                <Typography label={__('Typography:', 'price-calculator')} typography={headingTypo} onChange={val => setAttributes({ headingTypo: val })} defaults={{ fontSize: 28 }} />

                <BColor value={headingColor} onChange={val => setAttributes({ headingColor: val })} defaultColor='#40444f' />
            </PanelBody>


            <PanelBody className='bPlPanelBody' title={__('Number & Label Style', 'price-calculator')} initialOpen={false}>
                <Typography label={__('Number Typography:', 'price-calculator')} typography={numberTypo} onChange={val => setAttributes({ numberTypo: val })} defaults={{ fontSize: 20, fontWeight: 700 }} />

                <Typography label={__('Label Typography:', 'price-calculator')} typography={labelTypo} onChange={val => setAttributes({ labelTypo: val })} defaults={{ fontSize: 15 }} />

                <BColor value={numberLabelColor} onChange={val => setAttributes({ numberLabelColor: val })} defaultColor='#40444f' />
            </PanelBody>


            <PanelBody className='bPlPanelBody' title={__('Quantity Range Style', 'price-calculator')} initialOpen={false}>
                <UnitControl label={__('Width:', 'price-calculator')} labelPosition='left' value={rangeWidth} onChange={val => setAttributes({ rangeWidth: val })} units={[pxUnit, perUnit, emUnit]} />

                <Background label={__('Track Background', 'price-calculator')} background={rangeTrackBG} onChange={val => setAttributes({ rangeTrackBG: val })} defaults={{ type: 'gradient', gradient: 'radial-gradient(#70777f, #40444f)' }} isImage={false} />

                <Background label={__('Thumb Background', 'price-calculator')} background={rangeThumbBG} onChange={val => setAttributes({ rangeThumbBG: val })} defaults={{ type: 'gradient', gradient: 'radial-gradient(#70777f, #40444f)' }} isImage={false} />

                <small>{__('Some style may not work in editor/backend!')}</small>
            </PanelBody>
        </InspectorControls>

        <BlockControls>
            <AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Price Calculator Alignment')} alignmentControls={[
                { title: __('Price Calculator in left', 'price-calculator'), align: 'left', icon: 'align-left' },
                { title: __('Price Calculator in center', 'price-calculator'), align: 'center', icon: 'align-center' },
                { title: __('Price Calculator in right', 'price-calculator'), align: 'right', icon: 'align-right' }
            ]} />

            <AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
        </BlockControls>
    </>;
};
export default Settings;