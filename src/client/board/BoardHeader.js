import React, {useContext} from 'react';
import {EditableText} from '../service-components/EditableText.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import SettingIcon from '../images/settings_icon.svg';

import './BoardHeader.css';


export const BoardHeader = ({name}) => {
    const {settingsIsOpen, openSettings} = useContext(UserSettingsContext);
    const {changeBoardName} = useContext(BoardStoreContext);

    const editBoardName = (text) => {
        changeBoardName(text);
    };

    return (
        <div className='board__header'>
            <EditableText
                className='board-header'
                text={name}
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