import React, {useContext} from 'react';
import {EditableInput} from '../service-components/EditableInput.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {IDs} from '../constants/constants.js';
import SettingIcon from '../images/settings_icon.svg';

import './BoardHeader.css';


export const BoardHeader = ({name}) => {
    const {toggleSettings} = useContext(UserSettingsContext);
    const {changeBoardName} = useContext(BoardStoreContext);

    const editBoardName = (text) => {
        changeBoardName(text);
    };

    const handleSettingsClick = (e) => {
        e.preventDefault();
        toggleSettings();
    };

    return (
        <div className='board__header'>
            <EditableInput
                className='board-header'
                text={name}
                saveChanges={editBoardName}
            />

            <div className='board__settings-icon settings-icon'
                 id={IDs.SettingsButton}
                 onClick={handleSettingsClick}>
                <SettingIcon
                    fill='white'/>
            </div>
        </div>
    );
}