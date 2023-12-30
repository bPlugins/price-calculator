import { __ } from '@wordpress/i18n';
import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { TabPanel, PanelBody, PanelRow, TextControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button, Dashicon } from '@wordpress/components';
import { produce } from 'immer';

// Settings Components
import { Label, Background, BColor, BorderControl, HelpPanel, ShadowControl, SpaceControl, Typography } from '../../Components';
import { gearIcon } from '../../Components/utils/icons';
import { pxUnit, perUnit, emUnit } from '../../Components/utils/options';

import { generalStyleTabs } from './utils/options';

const Settings = ({ attributes, setAttributes }) => {
	const { currency, maxQuantity, unitPrice, unitPriceQuery, width, alignment, background, textAlign, padding, border, shadow, headingTypo, headingColor, numberTypo, labelTypo, numberLabelColor, rangeWidth, rangeTrackBG, rangeThumbBG } = attributes;

	const addPrice = () => {
		setAttributes({
			unitPriceQuery: [...unitPriceQuery, {
				afterQuantity: 100,
				unitPrice: 30
			}]
		});
	}

	const updatePrice = (index, type, val, otherType = false) => {
		const newUnitPriceQuery = produce(unitPriceQuery, draft => {
			if (otherType) {
				draft[index][type][otherType] = val;
			} else {
				draft[index][type] = val;
			}
		});
		setAttributes({ unitPriceQuery: newUnitPriceQuery });
	}

	const duplicateUnitPriceQuery = (e, index) => {
		e.preventDefault();

		setAttributes({ unitPriceQuery: [...unitPriceQuery.slice(0, index), { ...unitPriceQuery[index] }, ...unitPriceQuery.slice(index)] });
	}

	const removeUnitPriceQuery = (e, index) => {
		e.preventDefault();

		setAttributes({ unitPriceQuery: [...unitPriceQuery.slice(0, index), ...unitPriceQuery.slice(index + 1)] });
	}

	return <>
		<InspectorControls>
			<div className='pclbInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs}>{tab => <>
				{'general' == tab.name && <>
					<HelpPanel slug='price-calculator' docsLink='https://bblockswp.com/docs/price-calculator-block' />


					<PanelBody className='bPlPanelBody addRemoveItems' title={__('Price Calculator Settings', 'price-calculator')}>
						<PanelRow>
							<Label className=''>{__('Currency:', 'price-calculator')}</Label>
							<TextControl value={currency} onChange={val => setAttributes({ currency: val })} />
						</PanelRow>

						<NumberControl className='mt20' label={__('Max Quantity:', 'price-calculator')} labelPosition='left' value={maxQuantity} onChange={val => setAttributes({ maxQuantity: parseInt(val) })} />

						<NumberControl label={__('Unit Price:', 'price-calculator')} labelPosition='left' className='mt20 mb20' value={unitPrice} onChange={val => setAttributes({ unitPrice: parseFloat(val) })} />

						{unitPriceQuery.map((item, index) => {
							const { afterQuantity, unitPrice } = item;

							return <PanelBody key={index} className='bPlPanelBody editItem' title={__(`Unit Price ${index + 1}:`, 'price-calculator')} initialOpen={0 !== index ? false : true}>
								<NumberControl label={__('After Quantity:', 'price-calculator')} labelPosition='left' value={afterQuantity} onChange={val => updatePrice(index, 'afterQuantity', parseInt(val))} />

								<NumberControl label={__('Unit Price:', 'price-calculator')} labelPosition='left' className='mt15' value={unitPrice} onChange={val => updatePrice(index, 'unitPrice', parseFloat(val))} />

								<PanelRow className='itemAction mt20'>
									<Button className='removeItem' label={__('Remove', 'price-calculator')} onClick={e => removeUnitPriceQuery(e, index)} ><Dashicon icon='no' />{__('Remove', 'price-calculator')}</Button>

									<Button className='duplicateItem' label={__('Duplicate', 'price-calculator')} onClick={e => duplicateUnitPriceQuery(e, index)} >{gearIcon}{__('Duplicate', 'price-calculator')}</Button>
								</PanelRow>
							</PanelBody>
						})}

						<div className='addItem'>
							<Button label={__('Add New Price', 'price-calculator')} onClick={addPrice}><Dashicon icon='plus' />{__('Add New Price', 'price-calculator')}</Button>
						</div>
					</PanelBody>
				</>}


				{'style' == tab.name && <>
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

						<BColor value={headingColor} onChange={val => setAttributes({ headingColor: val })} defaultColor='#40444f' />
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Number & Label', 'price-calculator')} initialOpen={false}>
						<Typography label={__('Number Typography:', 'price-calculator')} value={numberTypo} onChange={val => setAttributes({ numberTypo: val })} defaults={{ fontSize: { desktop: 20, tablet: 18, mobile: 16 }, fontWeight: 700 }} />

						<Typography label={__('Label Typography:', 'price-calculator')} value={labelTypo} onChange={val => setAttributes({ labelTypo: val })} defaults={{ fontSize: { desktop: 15, tablet: 15, mobile: 15 } }} />

						<BColor value={numberLabelColor} onChange={val => setAttributes({ numberLabelColor: val })} defaultColor='#40444f' />
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('Quantity Range', 'price-calculator')} initialOpen={false}>
						<UnitControl label={__('Width:', 'price-calculator')} labelPosition='left' value={rangeWidth} onChange={val => setAttributes({ rangeWidth: val })} units={[pxUnit(), perUnit(), emUnit()]} />

						<Background label={__('Track Background', 'price-calculator')} value={rangeTrackBG} onChange={val => setAttributes({ rangeTrackBG: val })} defaults={{ type: 'gradient', gradient: 'radial-gradient(#70777f, #40444f)' }} isImage={false} />

						<Background label={__('Thumb Background', 'price-calculator')} value={rangeThumbBG} onChange={val => setAttributes({ rangeThumbBG: val })} defaults={{ type: 'gradient', gradient: 'radial-gradient(#70777f, #40444f)' }} isImage={false} />

						<small>{__('Some style may not work in editor/backend!')}</small>
					</PanelBody>
				</>}
			</>}</TabPanel>
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