import { CSSProperties } from 'react';

/**
 * reactSelectStyles - css style object for react-select
 */
export const reactSelectStyles = {
	container: (provided, state) => ({
		...provided,
		pointerEvents: state.isDisabled ? 'unset' : 'all'
	}),
	option: (provided, state) => ({
		...provided,
		color: '#000000',
		backgroundColor: state.isSelected ? '#808095' : state.isDisabled ? '#BDBDCF' : '',
		':active': {
			backgroundColor: '#ecf0ff'
		},
		':hover': {
			backgroundColor: state.isSelected ? '#808095' : '#BDBDCF'
		},
		':focus': {
			backgroundColor: '#cacaca',
			outline: 0
		},
		padding: '10px 10px',
		cursor: 'pointer',
		margin: 0,
		borderBottom: '1px solid #f1f2f4'
	}),
	control: (provided, state) => ({
		color: '#fff',
		borderRadius: '10px',
		height: '43px',
		backgroundColor: state.isDisabled ? '#e9ecef' : 'transparent',
		padding: '0',
		border: '2px solid #f1f2f4',
		zIndex: '2000',
		display: 'flex',
		cursor: state.isDisabled ? 'not-allowed' : 'pointer'
	}),
	menu: (base) => ({
		...base,
		zIndex: 100,
		cursor: 'pointer',
		left: '0',
		boxShadow: 'none',
		border: '1px solid #f1f2f4'
	}),
	menuList: (styles) => ({
		...styles,
		background: '#fff'
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';
		return {
			...provided,
			transition,
			color: '#081d34',
			backgroundColor: 'transparent',
			fontSize: '14px',
			fontWeight: '600'
		};
	},
	placeholder: (defaultStyles) => {
		return {
			...defaultStyles,
			color: '#808095'
		};
	},
	clearIndicator: (base: CSSProperties) => ({
		...base,
		cursor: 'pointer'
	}),
	dropdownIndicator: (base: CSSProperties, state: any) => ({
		...base,
		cursor: 'pointer',
		transition: 'all 0.2s ease',
		transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none'
	}),
	indicatorSeparator: () => ({
		width: '0'
	})
};
