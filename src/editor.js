import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';

// Import Files
import './editor.scss';

// Icons
import icons from './Const/icons';
const icon = icons.priceCalculator;

// Metadata
import metadata from '../block.json';
const { name, title, description, category, keywords, supports, attributes, example } = metadata;

registerBlockType(name, {
    title, description, icon, category, keywords, supports, attributes, example,

    // Build In Functions
    edit: Edit,

    save: () => null
});