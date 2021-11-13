import React, {useContext, useState} from 'react';
import {EditableText} from '../service-components/EditableText.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import SettingIcon from '../images/settings_icon.svg';

import './BoardHeader.css';

export const BoardHeader = (props) => {
    const {settingsIsOpen, openSettings} = useContext(UserSettingsContext);
    const [headerText, setHeaderText] = useState(props.name);

    const editBoardName = (text) => {
        setHeaderText(text);
    };

    return (
        <div className="board__header">
            <EditableText
                className='board-header'
                text={headerText}
                saveChanges={editBoardName}
            />

            <div className='board__settings-icon settings-icon'
                 id='setting-button'
                 onClick={() => openSettings(true)}>
                <SettingIcon
                    fill='white'/>
            </div>
        </div>
    );
}