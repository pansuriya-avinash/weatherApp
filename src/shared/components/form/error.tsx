import React, { PropsWithChildren } from 'react';
// import { Translate } from '../translate';

/**
 * common field error message component
 * @param props
 */
const FieldErrorMessage: React.FC<PropsWithChildren> = (props) => (
	<p className='error'>
		{/* <Translate text={props.children} /> */}
		{props.children}
	</p>
);

export default FieldErrorMessage;
