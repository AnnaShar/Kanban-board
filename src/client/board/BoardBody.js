import React, {useContext} from 'react';
import {BoardColumn} from '../board-column/BoardColumn.js';
import {BoardSettings} from '../board-settings/BoardSettings.js';
import {BoardAddColumnButton} from './BoardAddColumnButton.js';
import {DroppableContainer} from '../drag-drop-components/DroppableContainer.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';

import './BoardBody.css';


export const BoardBody = () => {
    const {board} = useContext(BoardStoreContext);
    const {settingsIsOpen} = useContext(UserSettingsContext);

    const columns = board.columnsOrder;

    const boardBody = columns.map((columnID, index) => {
        const column = board.columns[columnID];
        return (<BoardColumn
            key={column.id}
            column={column}
            index={index}
        />);
    });

    return (
        <div className='board__body'>
            <div className='board__columns-area'>

                <DroppableContainer
                    droppableId='board'
                    direction='horizontal'
                    type='column'
                    className='board__columns'>

                    {boardBody}

                </DroppableContainer>

                <BoardAddColumnButton/>

            </div>

            {settingsIsOpen && <BoardSettings/>}
        </div>
    );
}