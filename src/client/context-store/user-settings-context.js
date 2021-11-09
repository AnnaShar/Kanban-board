import React, {useState} from 'react';
import themes from '../constants/themes.js';
import languages from '../constants/languages.js';

export const UserSettingsContext = React.createContext(null);

export default ({children}) => {

    const getLanguage = () => {
        const language = localStorage.getItem('language');
        if (language){
            return JSON.parse(language);
        }
        return languages.eng;
    }

    const getTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme){
            return JSON.parse(theme);
        }

        return themes['#cea4a4'];
    }

    const [theme, setTheme] = useState(getTheme());
    const [language, setLanguage] = useState(getLanguage());


    const saveTheme = (theme) => {
        setTheme(theme)
        localStorage.setItem('theme', JSON.stringify(theme));
    }

    const saveLanguage = (language) => {
        setLanguage(language)
        localStorage.setItem('language', JSON.stringify(language));
    }

    const settings = {
        theme: theme,
        setTheme: saveTheme,
        language: language,
        setLanguage: saveLanguage
    }

    return <UserSettingsContext.Provider value={settings}>{children}</UserSettingsContext.Provider>;
}