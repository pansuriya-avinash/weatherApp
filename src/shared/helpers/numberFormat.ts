export const numberFormat = (value: number, args) => {
	const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];

	if (!value) {
		return value == 0 ? 0 : null;
	}

	if (Number.isNaN(value)) {
		return null;
	}

	if (value < 1000) {
		return value;
	}

	const exp = Math.floor(Math.log(value) / Math.log(1000));

	const returnValue = (value / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];

	return returnValue;
};
