import React from 'react';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import { Input, IFieldConfig } from './inputTypes';
import Button from './button';
import { Translate } from '../translate';
import localizationConstants from 'shared/util/translation/constants';
import WithTranslateFormErrors from 'shared/hoc/withErrorHandler/withTranslationError';

interface ICustomFormProps {
	schema: Yup.ObjectSchema<any>;
	onSubmit: (values: FormikValues) => void;
	loading: boolean;
	fieldConfig: IFieldConfig[];

	initialValues?: any;
	dataTestId?: string;
	submitBtnText?: string;
	validateOnBlur?: boolean;
	validateOnChange?: boolean;
	title?: string;
	cancelSubmit?: React.ReactEventHandler;
	iBoxContentClassName?: string;
	formClassName?: string;
	inputDivClassName?: string;
	submitBtnClassName?: string;
	btnGroupClassNames?: string;
	error?: string;
	showLabels?: boolean;
	showTitle?: boolean;
}

/**
 * common form to be rendered
 */
const CustomForm: React.FC<ICustomFormProps> = (props) => {
	const validateOnBlur = props.validateOnBlur === undefined ? true : props.validateOnBlur;
	const validateOnChange = props.validateOnChange === undefined ? false : props.validateOnChange;
	const initialValues = { ...(props.initialValues || {}) };
	props.fieldConfig.forEach((config) => {
		if (config.name !== 'status' && !initialValues[config.name]) {
			initialValues[config.name] = '';
		}
	});
	return (
		<div className='custom-form' data-testid={props.dataTestId || null}>
			<div className='row'>
				<div className='col-lg-12'>
					<div className='ibox float-e-margins'>
						{!props.showTitle && (
							<div className='ibox-title'>
								{!!props.title && (
									<h5 className='text-align-center'>
										<Translate text={props.title} />
									</h5>
								)}
							</div>
						)}
						<div className={`ibox-content ${props.iBoxContentClassName || ''}`}>
							{!!props.title && !!props.showTitle && (
								<h2 className='text-align-center'>
									<Translate text={props.title} />
								</h2>
							)}
							<Formik
								initialValues={initialValues}
								validateOnBlur={validateOnBlur}
								validateOnChange={validateOnChange}
								onSubmit={props.onSubmit}
								validationSchema={props.schema}
							>
								{({ handleSubmit, setFieldValue, setFieldTouched, errors, touched }) => (
									<WithTranslateFormErrors
										errors={errors}
										touched={touched}
										setFieldTouched={setFieldTouched}
									>
										<form onSubmit={handleSubmit} className={props.formClassName || ''}>
											<fieldset>
												{props.fieldConfig.map((config, index) => (
													<div
														key={index}
														className={[props.inputDivClassName || '', 'form-group'].join(
															''
														)}
													>
														<Input
															showLabels={props.showLabels}
															setFieldValue={setFieldValue}
															config={config}
															placeholder={config.placeHolder || config.label}
															type={config.type}
															name={config.name}
														/>
													</div>
												))}

												<div className='row'>
													{!!props.error && (
														<p className='error text-align-center'>
															<Translate text={props.error} />
														</p>
													)}
												</div>
												<div
													className={`${
														props.btnGroupClassNames
													} mb-3 mt-3 d-flex align-items-center ${
														!props.btnGroupClassNames && 'justify-content-center'
													}`}
												>
													{props.cancelSubmit && (
														<Button
															btnType='danger'
															onClick={props.cancelSubmit}
															type='button'
															className='mr-2 width-100px'
														>
															{localizationConstants.cancel}
														</Button>
													)}
													<Button
														className={`${props.submitBtnClassName} width-100px`}
														loading={props.loading}
														type='submit'
														btnType='primary'
													>
														{props.submitBtnText || localizationConstants.submit}
													</Button>
												</div>
											</fieldset>
										</form>
									</WithTranslateFormErrors>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export { CustomForm };
