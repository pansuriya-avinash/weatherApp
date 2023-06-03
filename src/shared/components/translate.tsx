import { useTranslation } from 'react-i18next';

// @ts-ignore
const Translate: React.FC<{ text: string }> = (props) => {
	const { t } = useTranslation();
	return t(props.text);
};

export { Translate };
