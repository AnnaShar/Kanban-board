import React, {useState, useContext} from 'react';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {EditableText} from '../board/EditableText.js';

import './BoardColumnHeader.css';


export const BoardColumnHeader = (props) => {
    const {editColumnName} = useContext(BoardStoreContext);
    const [headerText, setHeaderText] = useState(props.name);

    const editText = (text) => {
        setHeaderText(text);
        editColumnName(props.id, headerText);
    }

    return (
        <div className='board-column__header column-header'>
           <EditableText
               className='column-header'
               text={headerText}
               saveChanges={editText}
           />
        </div>
    );
}