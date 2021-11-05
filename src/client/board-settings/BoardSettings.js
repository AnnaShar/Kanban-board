import React, {useContext} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {CirclePicker} from 'react-color';
import Select, { StylesConfig } from 'react-select'
import themes from '../constants/themes.js';
import languages from '../constants/languages.js';
import texts from '../constants/texts.js';
import './BoardSettings.css';

export const BoardSettings = () => {
    const {theme, setTheme, language, setLanguage} = useContext(UserSettingsContext);

    const handleColorChange = (color) => {
        console.log(color.hex);
        setTheme(themes[color.hex]);
        console.log(themes[color.hex]);
    }
    const handleLanguageChange = (language) => {
        setLanguage(languages[language.value]);
    }

    return (
        <div className='board__settings'>
            <h2>{texts.settings.header[language.value]}</h2>
            <div className='setting-item theme-settings'>
                <div className='setting-item__header'>
                    {texts.settings.chooseTheme[language.value]}
                </div>
                <div className='setting-item__body'>
                    <CirclePicker
                        color={theme.base}
                        colors={Object.keys(themes)}
                        onChange={handleColorChange}
                    />
                </div>
            </div>

            <div className='setting-item theme-settings'>
                <div className='setting-item__header'>
                    {texts.settings.chooseLanguage[language.value]}
                </div>
                <div className='setting-item__body'>
                    <Select
                        defaultValue = {language}
                        options={Object.values(languages)}
                        onChange={handleLanguageChange}
                        theme={(themeSelect) => ({
                            ...themeSelect,
                            colors: {
                                ...themeSelect.colors,
                                primary50: theme.light,
                                primary25: theme.light,
                                primary: theme.base,
                            },
                        })}
                    />
                </div>
            </div>
        </div>
    )
}