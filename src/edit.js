import { useEffect } from '@wordpress/element';

import Settings from './Settings';
import Style from './Style';
import PriceCalculator from './PriceCalculator';

const Edit = props => {
	const { className, attributes, setAttributes, clientId } = props;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	return <>
		<Settings attributes={props.attributes} setAttributes={setAttributes} />

		<div className={className} id={`pclbPriceCalculator-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<PriceCalculator attributes={attributes} isBackend={true} wp={{ setAttributes }} />
		</div>
	</>;
};
export default Edit;