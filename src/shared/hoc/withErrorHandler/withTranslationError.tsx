import React, { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
	errors: any;
	touched: any;
	setFieldTouched: (field: string, isTouched?: boolean) => void;
}

const WithTranslateFormErrors: React.FC<IProps> = (props) => {
	// const { errors, touched, setFieldTouched } = props;
	// useTranslateFormErrors(errors, touched, setFieldTouched);
	return <>{props.children}</>;
};

export default WithTranslateFormErrors;
