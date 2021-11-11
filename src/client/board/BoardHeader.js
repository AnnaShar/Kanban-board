import React, {useState} from 'react';
import {EditableText} from './EditableText.js';
import SettingIcon from '../images/settings_icon.svg';

import './BoardHeader.css';

export const BoardHeader = (props) => {
    const [headerText, setHeaderText] = useState(props.name);

    const editBoardName = (text) => {
        setHeaderText(text);
    };

    return (
        <div className="board__header">
            <EditableText
                className='board-header'
                text = {headerText}
                saveChanges={editBoardName}
            />

            <div className='board__settings-icon settings-icon'
                 onClick={props.openSettings}>
                <SettingIcon
                    fill='white'/>
            </div>
        </div>
    );
}