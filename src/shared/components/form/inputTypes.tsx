import React, { ChangeEventHandler, useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { Field, ErrorMessage, FieldProps, FormikValues } from 'formik';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Collapsible from 'react-collapsible';

import localizationConstants from 'shared/util/translation/constants';

import FieldErrorMessage from './error';
import { Translate } from '../translate';
import { reactSelectStyles } from './reactSelectStyles';
import { CalendarIcon, DropDownArrowDown } from 'shared/icons/icons';
import DatePicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import Select from 'react-select';
import moment from 'moment';

export interface IDropDownAndCheckboxOptions {
	id?: string | number;
	name: string;
	value: string | number;
	label?: string;
	disabled?: boolean;
}
export interface IFieldConfig {
	type:
		| 'text'
		| 'textarea'
		| 'email'
		| 'password'
		| 'number'
		| 'dropdown'
		| 'checkbox'
		| 'dropdown'
		| 'file'
		| 'datepicker';
	label: string;
	name: string;
	mode?: string;
	isCollapsible?: boolean;
	className?: string;
	placeHolder?: string;
	hideDefaultOption?: boolean;
	otherOptions?: {
		dropDownOptions?: IDropDownAndCheckboxOptions[];
		dropDownDefaultOption?: IDropDownAndCheckboxOptions;
		checkboxOptions?: IDropDownAndCheckboxOptions[];
		isMultiSelect?: boolean;
		isOptionDisabled?: boolean;
		note?: string;
		suggestion?: string;
		sampleFile?: {
			label?: JSX.Element;
			link: string;
		};
	};
	disabled?: boolean;
}
interface ITextFieldProps {
	name: string;
	mode?: string;
	rows?: number;
	placeholder: string;
	config: IFieldConfig;
	setFieldValue: (field: string, value: any) => void;
	onInputChange?: (event: any) => void;
	disabled?: boolean;
	disableWheel?: boolean;
	readOnly?: boolean;
	type?: 'text' | 'textarea' | 'email' | 'password' | 'number' | 'checkbox' | 'dropdown' | 'file' | 'datepicker';
	className?: string;
	autoComplete?: string;
	showLabels?: boolean;
	isMultiFile?: boolean;
	value?: string | number | IDropDownAndCheckboxOptions;
	supportedType?: string;
	onSelectFile?: (event: any) => void;
	asterisk?: boolean;
	isClearable?: boolean;
	showTimeSelect?: boolean;
	minDate?: string | number;
	maxDate?: string | number;
	timeFormat?: string;
	timeIntervals?: string | number;
	dateFormat?: string;
	inline?: boolean;
	isOptionDisabled?: boolean;
}

const RenderInput: React.FC<ITextFieldProps & { field: any }> = (props) => {
	const { t } = useTranslation();
	const suggestion = (props.config.otherOptions || {}).suggestion;
	const [calendarIsOpen, setCalendarIsOpen] = useState(false);
	const datePickerRef = useRef(null);

	switch (props.type) {
		// render text input in case of text, textarea, email, password and number
		case 'textarea':
			return (
				<>
					{props.showLabels && props.config.label && (
						<label className='ignore-text-capitalize input-label-wrapper'>
							<Translate text={props.config.label} />
						</label>
					)}
					<textarea
						{...props.field}
						value={getValue(props.field.value)}
						id={props.name}
						rows={props.rows}
						onChange={(e) => props.setFieldValue(e.target.name, e.target.value)}
						className={`${props.className || ''} form-control`}
						placeholder={t(props.placeholder)}
						disabled={props.disabled ? true : false}
						readOnly={props.readOnly}
						autoComplete={`${props.autoComplete || 'off'}`}
					/>
					<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
					{getNote((props.config.otherOptions || {}).note)}
				</>
			);
		case 'text':
		case 'email':
		case 'password':
			return (
				<>
					{props.showLabels && props.config.label && (
						<label className='ignore-text-capitalize input-label-wrapper'>
							<span>
								<Translate text={props.config.label} />
							</span>
							<br />
							{suggestion && (
								<span className='field-suggestion'>
									( <Translate text='suggested' /> <Translate text={props.config.label} />:{' '}
									{suggestion})
								</span>
							)}
						</label>
					)}
					<input
						{...props.field}
						value={getValue(props.field.value)}
						id={props.name}
						type={props.type}
						onWheelCapture={(e) => props.disableWheel && e.currentTarget.blur()}
						className={`${props.className || ''} form-control`}
						placeholder={t(props.placeholder)}
						disabled={props.disabled ? true : false}
						readOnly={props.readOnly}
						autoComplete={`${props.autoComplete || 'off'}`}
					/>
					<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
					{getNote((props.config.otherOptions || {}).note)}
				</>
			);
		case 'number':
			return (
				<>
					{props.showLabels && props.config.label && (
						<label className='ignore-text-capitalize input-label-wrapper'>
							<span>
								<Translate text={props.config.label} />
							</span>
							<br />
							{suggestion && (
								<span className='field-suggestion'>
									( <Translate text='suggested' /> <Translate text={props.config.label} />:{' '}
									{suggestion})
								</span>
							)}
						</label>
					)}
					<input
						{...props.field}
						value={getValue(props.field.value)}
						id={props.name}
						onChange={(e) => props.setFieldValue(e.target.name, parseInt(e.target.value))}
						type={props.type}
						onWheelCapture={(e) => props.disableWheel && e.currentTarget.blur()}
						className={`${props.className || ''} form-control`}
						placeholder={t(props.placeholder)}
						disabled={props.disabled ? true : false}
						readOnly={props.readOnly}
						autoComplete={`${props.autoComplete || 'off'}`}
					/>
					<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
					{getNote((props.config.otherOptions || {}).note)}
				</>
			);
		case 'checkbox':
			return (
				// <div className='form-group d-flex align-items-baseline'>
				<div className='form-group align-items-baseline'>
					{props.config.label && (
						<>
							{props.config.isCollapsible ? (
								<Collapsible
									easing='ease-in-out'
									transitionTime={250}
									trigger={getCollapsiblePanelHeader(props.config.label, false, props)}
									triggerWhenOpen={getCollapsiblePanelHeader(props.config.label, true, props)}
								>
									{getCheckBoxFields(props)}
								</Collapsible>
							) : (
								<label className='ignore-text-capitalize col-xs-4 col-sm-2 control-label'>
									<Translate text={props.config.label} />
								</label>
							)}
						</>
					)}
					{!props.config.isCollapsible && getCheckBoxFields(props)}
				</div>
			);
		case 'dropdown':
			return (
				<>
					{props.showLabels && props.config.label && (
						<label className='ignore-text-capitalize input-label-wrapper'>
							{props.config.label}
							{props.asterisk && <span className='required'>*</span>}
						</label>
					)}
					<Select
						placeholder={props.placeholder}
						value={props.value as IDropDownAndCheckboxOptions}
						styles={reactSelectStyles as any}
						isClearable={props.isClearable}
						name={props.config.name}
						options={geDropDownOptions(props.config)}
						onChange={(selectedOption) => props.setFieldValue(props.config.name, selectedOption || '')}
						classNamePrefix='select dropdown-select'
						isDisabled={props.disabled || props.readOnly}
						isMulti={false}
						className={`${props.className} react-select`}
						isSearchable={true}
						onInputChange={(inputValue) => {
							!!props.onInputChange && props.onInputChange(inputValue);
						}}
						isOptionDisabled={(option) => option.disabled}
					/>
					<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
				</>
			);
		case 'datepicker': {
			const selectedTodayDate =
				moment(props.field.value && new Date(props.field.value)).format('DD-MM-YYYY') ===
				moment().format('DD-MM-YYYY');
			const currentDate = moment().toDate();
			const currentTimeArray = moment().format('HH:mm:ss').split(':');
			const minTime = selectedTodayDate
				? currentDate.setHours(
						parseInt(currentTimeArray[0]),
						parseInt(currentTimeArray[1]),
						parseInt(currentTimeArray[2])
				  )
				: currentDate.setHours(0, 0, 0);
			const handleClick = () => {
				if (datePickerRef.current) {
					datePickerRef.current.setOpen(true);
				}
			};
			return (
				<>
					{props.showLabels && props.config.label && (
						<label className='ignore-text-capitalize input-label-wrapper'>
							{props.config.label}
							{props.asterisk && <span className='required'>*</span>}
						</label>
					)}
					<div className='date-picker--wrapper position--relative d-flex align-items-center'>
						<div className='icon--wrapper d-flex align-items-center justify-content-center position--absolute'>
							<CalendarIcon className='calendar-icon' />
						</div>
						<DatePicker
							{...props.field}
							todayButton={'Today'}
							ref={datePickerRef}
							disabled={props.disabled}
							inline={props.inline}
							autoComplete='off'
							className='form-field datepicker-input'
							locale='en-GB'
							placeholderText={props.placeholder || ''}
							selected={props.field.value && new Date(props.field.value)}
							onChangeRaw={({ currentTarget }) => {
								const newRaw = new Date(currentTarget.value);
								if (
									newRaw instanceof Date &&
									newRaw.toString() !== 'Invalid Date' &&
									newRaw.toString() !== 'Invalid time value'
								) {
									props.setFieldValue(props.config.name, newRaw || '');
								}
							}}
							onChange={(date) => {
								props.setFieldValue(props.config.name, date || '');
							}}
							showMonthDropdown
							showYearDropdown
							showTimeSelect={true}
							minDate={moment().toDate()}
							minTime={minTime}
							maxTime={moment().toDate().setHours(23, 59, 59)}
							maxDate={props.maxDate}
							timeFormat={props.timeFormat || 'p'}
							timeIntervals={props.timeIntervals || 15}
							dateFormat={props.dateFormat || 'Pp'}
							dropdownMode='select'
							fixedHeight
							isClearable={props.isClearable}
							showTimeInput={false}
							popperClassName='some-custom-class'
							popperPlacement='top-end'
							popperModifiers={[
								{
									name: 'offset',
									options: {
										offset: [-47, 0]
									}
								},
								{
									name: 'preventOverflow',
									options: {
										rootBoundary: 'viewport',
										tether: false,
										altAxis: true
									}
								}
							]}
							onClickOutside={() => {
								setCalendarIsOpen(false);
							}}
						/>
						<div
							className={`position--absolute mr-7 right-0 bottom--17px date-picker-arrow`}
							onClick={!props.disabled && handleClick}
						>
							<DropDownArrowDown />
						</div>
					</div>
					<ErrorMessage name={props.name} component={FieldErrorMessage} />
				</>
			);
		}
		case 'file':
			return (
				<>
					{props.showLabels && props.config.label && (
						<>
							<label className='ignore-text-capitalize input-label-wrapper'>
								<Translate text={props.config.label} />{' '}
								{(props.config.otherOptions || {}).sampleFile && (
									<span>
										(&nbsp;
										<a href={((props.config.otherOptions || {}).sampleFile || {}).link} download>
											{((props.config.otherOptions || {}).sampleFile || {}).label ? (
												((props.config.otherOptions || {}).sampleFile || {}).label
											) : (
												<Translate text={localizationConstants.downloadSampleFile} />
											)}
										</a>
										&nbsp;)
									</span>
								)}
							</label>
							<br />
						</>
					)}
					<input
						{...props.field}
						id={props.name}
						type={props.type}
						value={props.field.value}
						className={`${props.className || ''} form-control hide`}
						multiple={props.isMultiFile}
						onChange={props.onSelectFile}
					/>
					<label htmlFor={props.name} className='btn btn-info'>
						<Translate text={props.config.label || localizationConstants.upload} />
					</label>
					{!!props.supportedType && (
						<p className='mb-0'>
							<Translate text={localizationConstants.supportedType} />: <b>{props.supportedType}</b>
						</p>
					)}
					<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
					{getNote((props.config.otherOptions || {}).note)}
				</>
			);
		default:
			return <></>;
	}
};

/**
 * common input field component
 * renders input based on the field configuration
 * @param props { field, form: { touched, errors }, ...props }
 */
const Input: React.FC<ITextFieldProps> = (props) => {
	const fieldRender = ({ field }: { field: any }) => {
		return <RenderInput {...props} field={field} />;
	};

	return <Field name={props.name}>{fieldRender}</Field>;
};

const RenderAsyncSelect = (props: any) => {
	const { t } = useTranslation();
	return (
		<>
			{props.config.label && (
				<label className='ignore-text-capitalize input-label-wrapper'>
					<Translate text={props.config.label} />
				</label>
			)}
			<AsyncSelect
				{...props.field}
				placeholder={t(props.placeholder) || ''}
				value={props.value}
				onChange={props.onChange}
				onInputChange={props.onInputChange}
				defaultOptions={props.defaultOptions}
				noOptionsMessage={props.noOptionsMessage}
				loadOptions={props.loadOptions}
				options={props.options}
				getOptionLabel={props.getOptionLabel}
				getOptionValue={props.getOptionValue}
				isClearable={props.isClearable ? true : false}
				isDisabled={props.disabled ? true : false}
				styles={reactSelectStyles}
				closeMenuOnSelect={props.closeMenuOnSelect ? true : false}
				isSearchable={props.isSearchable ? true : false}
			/>
		</>
	);
};

const Asyncselect: React.FC<FieldProps<FormikValues> & any> = (props) => {
	const fieldRender = ({ field }: { field: any }) => {
		return <RenderAsyncSelect {...props} field={field} />;
	};
	return <Field name={props.name}>{fieldRender}</Field>;
};

/**
 * getCheckboxValue - returns check box value, after changing value with change event of html input element
 * @param field - field returned by formik
 * @param evt - html input change event, linked with checkbox input
 */
const getCheckboxValue = (field: any, evt: React.ChangeEvent<HTMLInputElement>) => {
	// if field value is empty, or null initially, assign it as empty array of strings
	if (!field.value) {
		field.value = [];
	}
	const index = field.value.indexOf(evt.target.value.toString());
	// if event gives `checked` = true, push target value to field value
	if (evt.target.checked) {
		field.value.push(evt.target.value.toString());
	} else if (index !== -1) {
		// else remove target value from field value
		field.value.splice(index, 1);
	}
	// return value
	return field.value;
};

const geDropDownOptions = (config: IFieldConfig) => {
	return (config.otherOptions || {}).dropDownOptions || [];
};
const geDropDownDefaultOptions = (config: IFieldConfig) => {
	return (config.otherOptions || {}).dropDownDefaultOption || {};
};

const geCheckboxOptions = (config: IFieldConfig) => {
	return (config.otherOptions || {}).checkboxOptions || [];
};

const getValue = (value?: string | number) => {
	if (value === undefined || value === null) {
		return '';
	}
	return value;
};

const getNote = (note: string | undefined | null) => {
	if (note === undefined || note === null) {
		return '';
	}
	return (
		<div className='field-note'>
			<Translate text='note' /> : <Translate text={note} />
		</div>
	);
};

const getCheckBoxFields = (props: ITextFieldProps & { field: any }) => {
	return (
		<>
			<div className='checkbox-wrapper col-xs-12 col-sm-12 col-md-12 col-lg-12'>
				{geCheckboxOptions(props.config).map((option) => {
					const setCheckboxvalue: ChangeEventHandler<HTMLInputElement> = (evt) => {
						props.setFieldValue(props.config.name, getCheckboxValue(props.field, evt));
					};
					const isChecked = (props.field.value || [])
						.map((key: any) => (key || '').toString())
						.includes(option.value.toString());
					return (
						<div className='checkbox-content col-lg-3 col-md-4 col-sm-6 col-xs-12' key={option.value}>
							<label className='ignore-text-capitalize checkbox-label'>
								<Translate text={option.name} />
								<input
									placeholder={option.name}
									checked={isChecked}
									onChange={setCheckboxvalue}
									type='checkbox'
									name={option.name}
									value={option.value}
								/>
								{/* {
									//@ts-ignore
									<span className='checkmark' mode={props.mode || ''} />
								} */}
							</label>
						</div>
					);
				})}
			</div>
			<ErrorMessage name={props.config.name} component={FieldErrorMessage} />
			{getNote((props.config.otherOptions || {}).note)}
		</>
	);
};

const getCollapsiblePanelHeader = (title: string, isOpen: boolean, props: ITextFieldProps & { field: any }) => {
	const isChecked = props.field.value.length === geCheckboxOptions(props.config).length;
	const setCheckboxvalue = (event: any) => {
		if (isChecked || isOpen) {
			event.preventDefault();
			event.stopPropagation();
		}
		if (!isChecked) {
			const checkedValue = geCheckboxOptions(props.config).map((checkBox: any) => checkBox.value.toString());
			props.setFieldValue(props.config.name, checkedValue);
		} else {
			props.setFieldValue(props.config.name, []);
		}
	};
	return (
		<div className='collapsible-custom-header checkbox-wrapper'>
			<div className='checkbox-content' onClick={(e) => setCheckboxvalue(e)}>
				<label className='ignore-text-capitalize col-lg-10 col-md-10 col-xs-10 col-sm-10 control-label checkbox-label'>
					<Translate text={title} />
					<input checked={isChecked} onChange={() => 0} type='checkbox' name={i18next.t(title)} />
					<span className='checkmark' />
				</label>
			</div>
			<button>
				<i className={`fa fa-chevron-${isOpen ? 'up' : 'down'}`} />
			</button>
		</div>
	);
};

const InputDatePicker: React.FC<FieldProps<FormikValues> & any> = (props) => {
	registerLocale('en-gb', enGB);
	const fieldRender = ({ field }: { field: any }) => <RenderDatePicker {...props} field={field} />;
	return <Field name={props.name} render={fieldRender} />;
};

const RenderDatePicker = (props: any) => {
	return (
		<>
			{props.label && (
				<label className='text-capitalize font--12px line-height--17px font-weight--400 color--light-grey'>
					{props.label}
					{props.asterisk && <span className='required'>*</span>}
				</label>
			)}
			<div className='date-picker--wrapper position--relative'>
				<DatePicker
					{...props.field}
					todayButton={'Today'}
					disabled={props.disabled}
					inline={props.inline}
					className='form-field mb-8'
					autoComplete='off'
					locale='en-gb'
					placeholderText={props.placeholder || ''}
					selected={props.field.value && new Date(props.field.value)}
					onChange={props.onChange}
					showMonthDropdown
					showYearDropdown
					showTimeSelect={props.showTimeSelect ? true : false}
					minDate={props.minDate}
					maxDate={props.maxDate}
					timeFormat={props.timeFormat || 'p'}
					timeIntervals={props.timeIntervals || 15}
					dateFormat={props.dateFormat || 'Pp'}
					dropdownMode='select'
					fixedHeight
					isClearable={props.isClearable}
				/>
			</div>
			<ErrorMessage name={props.name} component={FieldErrorMessage} />
		</>
	);
};

export { Input, Asyncselect, InputDatePicker };
