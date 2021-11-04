import React, {useContext} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {CirclePicker} from 'react-color';
import themes from '../constants/themes.js';
import './BoardSettings.css';

export const BoardSettings = () => {
    const {theme: [theme, setTheme]} = useContext(UserSettingsContext);

    const handleColorChange = (color)=>{
        setTheme(color.hex);
    }

    return (
        <div className='board__settings'>
            <h2>Settings</h2>
            <div className='setting-item theme-settings'>
                <div className='setting-item__header'>
                    Choose theme
                </div>
                <div className='setting-item__body'>
                    <CirclePicker
                        color={theme}
                        colors={Object.values(themes)}
                        onChange = {handleColorChange}
                    />
                </div>
            </div>
        </div>
    )
}