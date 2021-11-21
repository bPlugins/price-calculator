import { __ } from '@wordpress/i18n';
import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';

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

const Settings = ({ settings }) => {
    const { attributes: { width, alignment, background, textAlign, padding, border, shadow, headingTypo, headingColor, unitPrice, maxQuantity, numberTypo, labelTypo, numberLabelColor }, setAttributes } = settings;

    return <>
        <InspectorControls>
            <PanelBody className='bPlPanelBody' title={__('Price Calculator Settings', 'price-calculator')}>
                <Title mt='0'>{__('Per Unit Price', 'price-calculator')}</Title>
                <RangeControl value={unitPrice} onChange={val => setAttributes({ unitPrice: val })} min={0} max={1000} step={0.01} />

                <NumberControl className='mt20' label={__('Max Quantity:', 'price-calculator')} labelPosition='left' value={maxQuantity} onChange={val => setAttributes({ maxQuantity: val })} />
            </PanelBody>


            <PanelBody className='bPlPanelBody' title={__('Price Calculator Style', 'price-calculator')} initialOpen={false}>
                <UnitControl label={__('Width:', 'price-calculator')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit, perUnit, emUnit]} />
                <small>{__('Keep width 0, to auto width.', 'price-calculator')}</small>

                <Background label={__('Background', 'advanced-post-block')} background={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#e3edf1' }} />

                <SpaceControl className='mt20' label={__('Padding:', 'price-calculator')} space={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '15px', horizontal: '30px' }} />

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
        </InspectorControls>

        <BlockControls>
            <AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Price Calculator Alignment')} alignmentControls={[
                { title: __('Price Calculator in left', 'b-blocks'), align: 'left', icon: 'align-left' },
                { title: __('Price Calculator in center', 'b-blocks'), align: 'center', icon: 'align-center' },
                { title: __('Price Calculator in right', 'b-blocks'), align: 'right', icon: 'align-right' }
            ]} />

            <AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
        </BlockControls>
    </>;
};
export default Settings;