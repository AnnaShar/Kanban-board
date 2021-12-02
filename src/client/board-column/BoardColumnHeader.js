import React, {useContext} from 'react';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {EditableInput} from '../service-components/EditableInput.js';

import './BoardColumnHeader.css';


export const BoardColumnHeader = ({id, name}) => {
    const {changeColumnName} = useContext(BoardStoreContext);

    const editName = (text) => {
        changeColumnName(id, text);
    }

    return (
        <div className='board-column__header column-header'>
           <EditableInput
               className='column-header'
               text={name}
               saveChanges={editName}
           />
        </div>
    );
}