import { registerBlockType } from '@wordpress/blocks';

// Import Files
import Edit from './edit';
import './editor.scss';

// Icons
import icons from './Const/icons';

// Metadata
import metadata from '../block.json';

registerBlockType(metadata, {
    icon: icons.priceCalculator,

    // Build in Functions
    edit: Edit,

    save: () => null
});