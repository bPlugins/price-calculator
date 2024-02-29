import { registerBlockType } from '@wordpress/blocks';

import metadata from '../inc/block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';
import { priceCalculatorIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: priceCalculatorIcon,

	// Build in Functions
	edit: Edit,

	save: () => null
});