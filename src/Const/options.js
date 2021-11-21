import { __ } from '@wordpress/i18n';

const options = {
    pxUnit: { value: 'px', label: 'px', default: 0 },
    perUnit: { value: '%', label: '%', default: 0 },
    emUnit: { value: 'em', label: 'em', default: 0 },
    remUnit: { value: 'rem', label: 'rem', default: 0 },
    vwUnit: { value: 'vw', label: 'vw', default: 0 },
    vhUnit: { value: 'vh', label: 'vh', default: 0 },

    generalStyleTabs: [
        { name: 'general', title: __('General', 'b-blocks') },
        { name: 'style', title: __('Style', 'b-blocks') }
    ],

    gradients: [
        { name: 'Daisy Bush to Fuchsia Blue', gradient: 'linear-gradient(135deg, #4527a4, #8344c5)', slug: 'daisy-bush-to-fuchsia-blue' },
        { name: 'Reddish Orange to Yellowish Orange', gradient: 'linear-gradient(135deg, #fe6601, #fbb040)', slug: 'reddish-orange-to-yellowish-orange' },
        { name: 'Tuft Bush to Carnation Pink', gradient: 'linear-gradient(135deg, #fed1c7, #fe8dc6)', slug: 'tuft-bush-to-carnation-pink' },
        { name: 'Golden Fizz to Yellow Orange', gradient: 'linear-gradient(135deg, #f9ed32, #fbb040)', slug: 'golden-fizz-to-yellow-orange' },
        { name: 'Light Electric Violet to Electric Violet', gradient: 'linear-gradient(135deg, #e100ff, #7f00ff)', slug: 'light-electric-violet-to-electric-violet' },
        { name: 'Hot Pink to Violet Red', gradient: 'linear-gradient(135deg, #ff7db8, #ee2a7b)', slug: 'hot-pink-to-violet-red' },
        { name: 'Spring Green to Azure Radiance', gradient: 'linear-gradient(135deg, #00ff8f, #00a1ff)', slug: 'spring-green-to-azure-radiance' }
    ]
}
export default options;