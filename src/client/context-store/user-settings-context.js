import React, {useState} from 'react';
import themes from '../constants/themes.js';
import languages from '../constants/languages.js';

export const UserSettingsContext = React.createContext(null);

export default ({children}) => {
    const [theme, setTheme] = useState(themes.red);
    const [language, setLanguage] = useState(languages.eng);

    const settings = {
        theme: [theme, setTheme],
        language: [language, setLanguage]
    }

    return <UserSettingsContext.Provider value = {settings}>{children}</UserSettingsContext.Provider>;
}