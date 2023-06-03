import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AuthService from 'shared/services/auth.service';
import de from './translation/de';
import en from './translation/en';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
	de: {
		translation: de
	},
	en: {
		translation: en
	}
};

i18n.use(initReactI18next as any) // passes i18n down to react-i18next
	.init({
		resources,
		lng: AuthService.isLogin() ? AuthService.getUserLanguage() : localStorage.getItem('lang') || 'en',
		keySeparator: false, // we do not use keys in form messages.welcome
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;
const refreshLanguage = (language: string) => {
	i18n.changeLanguage(language);
	localStorage.setItem('lang', language);
};
export { refreshLanguage };
