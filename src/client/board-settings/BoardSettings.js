import React, {useContext, useRef, useEffect} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {CirclePicker} from 'react-color';
import Select from 'react-select';
import {useDetectClickOutside} from "react-detect-click-outside";
import themes from '../constants/themes.js';
import languages from '../constants/languages.js';
import texts from '../constants/texts.js';
import './BoardSettings.css';


export const BoardSettings = () => {
    const {theme, setTheme, language, setLanguage, settingsIsOpen, openSettings} = useContext(UserSettingsContext);
    const settingsContainer = useRef(null);
    // const closeToggle = () => {
    //     openSettings(false)
    // }
    // const ref = useDetectClickOutside({onTriggered: closeToggle});

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleColorChange = (color) => {
        setTheme(themes[color.hex]);
    }
    const handleLanguageChange = (language) => {
        setLanguage(languages[language.value]);
    }

    const handleClick = (e) => {
        if (settingsContainer.current && !settingsContainer.current.contains(e.target)
        && e.target.id!=='setting-button') {
            openSettings(false);
        }
        // console.log(e.target)
        if (e.target.id==='setting-button'){
            console.log('here')
        }
    }

    return (
        <>
            {settingsIsOpen &&
            <div
                // ref={ref}
                className='board__settings'
            >
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
                            defaultValue={language}
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
            }
        </>
    )
}