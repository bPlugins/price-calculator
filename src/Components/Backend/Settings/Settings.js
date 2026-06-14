import { __ } from '@wordpress/i18n';
import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { TabPanel, PanelBody, PanelRow, TextControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { produce } from 'immer';

import { Label, Background, ColorControl, HelpPanel, Typography, BBlocksAds } from '../../../../../bpl-tools/Components';
import { BorderControl, ShadowControl, SpaceControl } from '../../../../../bpl-tools/Components/Deprecated';
import ItemsPanel from '../../../../../bpl-tools/Components/ItemsPanel/ItemsPanel';
import { pxUnit, perUnit, emUnit } from '../../../../../bpl-tools/utils/options';

import { generalStyleTabs } from '../../../utils/options';

const Settings = ({ attributes, setAttributes }) => {
	const { currency, maxQuantity, unitPrice, width, alignment, background, textAlign, padding, border, shadow, headingTypo, headingColor, numberTypo, labelTypo, numberLabelColor, rangeWidth, rangeTrackBG, rangeThumbBG } = attributes;

	return <>
		<InspectorControls>
			<div className='bPlInspectorInfo'>
				<BBlocksAds />
			</div>

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs}>{tab => <>
				{'general' === tab.name && <>
					<HelpPanel slug='price-calculator' docsLink='https://bblockswp.com/docs/price-calculator-block' />


					<PanelBody className='bPlPanelBody addRemoveItems' title={__('Price Calculator Settings', 'price-calculator')}>
						<PanelRow>
							<Label className=''>{__('Currency:', 'price-calculator')}</Label>
							<TextControl value={currency} onChange={val => setAttributes({ currency: val })} />
						</PanelRow>

						<NumberControl className='mt20' label={__('Max Quantity:', 'price-calculator')} labelPosition='left' value={maxQuantity} onChange={val => setAttributes({ maxQuantity: parseInt(val) })} />

						<NumberControl label={__('Unit Price:', 'price-calculator')} labelPosition='left' className='mt20 mb20' value={unitPrice} onChange={val => setAttributes({ unitPrice: parseFloat(val) })} />

						<ItemsPanel
							design='all'
							attributes={attributes}
							setAttributes={setAttributes}
							arrKey='unitPriceQuery'
							newItem={{ afterQuantity: 100, unitPrice: 30 }}
							itemLabel={__('Unit Price', 'price-calculator')}
							ItemSettings={PriceItemSettings}
						/>
					</PanelBody>
				</>}


				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Price Calculator', 'price-calculator')}>
						<UnitControl label={__('Width:', 'price-calculator')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(550), perUnit(60), emUnit(35)]} isResetValueOnUnitChange={true} />
						<small>{__('Keep width 0, to auto width.', 'price-calculator')}</small>

						<Background label={__('Background', 'price-calculator')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#e3edf1' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'price-calculator')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '25px', horizontal: '30px' }} />

						<BorderControl label={__('Border:', 'price-calculator')} value={border} onChange={val => setAttributes({ border: val })} defaults={{ radius: '3px' }} />

						<ShadowControl label={__('Shadow:', 'price-calculator')} value={shadow} onChange={val => setAttributes({ shadow: val })} />
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Heading', 'price-calculator')} initialOpen={false}>
						<Typography label={__('Typography:', 'price-calculator')} value={headingTypo} onChange={val => setAttributes({ headingTypo: val })} defaults={{ fontSize: { desktop: 28, tablet: 24, mobile: 20 } }} />

						<ColorControl value={headingColor} onChange={val => setAttributes({ headingColor: val })} defaultColor='#40444f' />
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Number & Label', 'price-calculator')} initialOpen={false}>
						<Typography label={__('Number Typography:', 'price-calculator')} value={numberTypo} onChange={val => setAttributes({ numberTypo: val })} defaults={{ fontSize: { desktop: 20, tablet: 18, mobile: 16 }, fontWeight: 700 }} />

						<Typography label={__('Label Typography:', 'price-calculator')} value={labelTypo} onChange={val => setAttributes({ labelTypo: val })} defaults={{ fontSize: { desktop: 15, tablet: 15, mobile: 15 } }} />

						<ColorControl value={numberLabelColor} onChange={val => setAttributes({ numberLabelColor: val })} defaultColor='#40444f' />
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Quantity Range', 'price-calculator')} initialOpen={false}>
						<UnitControl label={__('Width:', 'price-calculator')} labelPosition='left' value={rangeWidth} onChange={val => setAttributes({ rangeWidth: val })} units={[pxUnit(), perUnit(), emUnit()]} />

						<Background label={__('Track Background', 'price-calculator')} value={rangeTrackBG} onChange={val => setAttributes({ rangeTrackBG: val })} defaults={{ type: 'gradient', gradient: 'radial-gradient(#70777f, #40444f)' }} isImage={false} />

						<Background label={__('Thumb Background', 'price-calculator')} value={rangeThumbBG} onChange={val => setAttributes({ rangeThumbBG: val })} defaults={{ type: 'gradient', gradient: 'radial-gradient(#70777f, #40444f)' }} isImage={false} />

						<small>{__('Some style may not work in editor/backend!', 'price-calculator')}</small>
					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Price Calculator Alignment', 'price-calculator')} alignmentControls={[
				{ title: __('Price Calculator in left', 'price-calculator'), align: 'left', icon: 'align-left' },
				{ title: __('Price Calculator in center', 'price-calculator'), align: 'center', icon: 'align-center' },
				{ title: __('Price Calculator in right', 'price-calculator'), align: 'right', icon: 'align-right' }
			]} />

			<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
		</BlockControls>
	</>;
};
export default Settings;

const PriceItemSettings = ({ attributes, setAttributes, arrKey, index }) => {
	const { unitPriceQuery } = attributes;
	const { afterQuantity, unitPrice } = unitPriceQuery[index];

	const updatePrice = (index, property, val) => {
		const newUnitPriceQuery = produce(attributes[arrKey], draft => {
			draft[index][property] = val;
		});

		setAttributes({ [arrKey]: newUnitPriceQuery });
	}

	return <>
		<NumberControl label={__('After Quantity:', 'price-calculator')} labelPosition='left' value={afterQuantity} onChange={val => updatePrice(index, 'afterQuantity', parseInt(val))} />

		<NumberControl label={__('Unit Price:', 'price-calculator')} labelPosition='left' className='mt15' value={unitPrice} onChange={val => updatePrice(index, 'unitPrice', parseFloat(val))} />
	</>;
};