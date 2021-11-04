import React, {useState, useRef, useEffect, useContext} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import themes from '../constants/themes.js';
import './BoardHeader.css';
import {ReactComponent as ReactLogo} from '../images/edit_icon.svg';
import SettingIcon from '../images/settings_icon.svg';

export const BoardHeader = (props) => {
    const [editable, setEditable] = useState(false);
    const [focused, setFocus] = useState(false);
    const headerText = useRef(null);
    const {theme: [theme, setTheme]} = useContext(UserSettingsContext);

    const handleEditClick = (e) => {
        setEditable(true);
        headerText.current.focus();
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setEditable(false);
        }
    }
    const handleBlur = (e) => {
        setEditable(false);
    }

    return (
        <div className="board__header">
            <div ref={headerText}
                 tabIndex={0}
                 onKeyDown={handleKeyDown}
                 onBlur={handleBlur}
                 contentEditable={editable}
                 className="board__name">{props.name}
            </div>

            <div className="board__edit-icon edit-icon">
                {/*<ReactLogo*/}
                {/*    onClick={handleEditClick}*/}
                {/*/>*/}
            </div>
            <div className='board__settings-icon settings-icon'
                 onClick={props.openSettings}>
                <SettingIcon
                    fill='white'/>
            </div>
        </div>
    );
}