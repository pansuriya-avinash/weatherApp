import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import { reactSelectStyles } from './reactSelectStyles';

const styles = {
	control: () => ({
		// none of react-selects styles are passed to <View />
		display: 'flex',
		width: '100%',
		minHeight: '38px !important',
		border: '1px solid #e5e6e7',
		padding: '0px !important'
	})
};

const ReactSelect: React.FC<any> = (props) => {
	const { t } = useTranslation();
	return (
		<Select
			placeholder={t(props.placeholder) || ''}
			menuPlacement={props.menuPlacement || 'auto'}
			value={props.value}
			onChange={props.onChange}
			isOptionDisabled={(options) => (props.isOptionDisabled ? props.isOptionDisabled(options) : false)}
			onInputChange={props.onInputChange}
			options={props.options}
			components={props.components || {}}
			getOptionLabel={props.getOptionLabel}
			getOptionValue={props.getOptionValue}
			isClearable={props.isClearable ? true : false}
			styles={{ ...reactSelectStyles, ...(props.styles || styles) }}
			closeMenuOnSelect={props.closeMenuOnSelect ? true : false}
			isSearchable={props.isSearchable ? true : false}
			isMulti={props.isMulti ? true : false}
			isDisabled={props.isDisabled ? true : false}
		/>
	);
};

export { ReactSelect };
