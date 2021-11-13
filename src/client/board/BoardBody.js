import React, {useContext} from 'react';
import {BoardColumn} from '../board-column/BoardColumn.js';
import {BoardSettings} from '../board-settings/BoardSettings.js';
import {BoardAddColumnButton} from './BoardAddColumnButton.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import './BoardBody.css';


export const BoardBody = () => {
    const {board} = useContext(BoardStoreContext);

    const columns = board.columnsOrder;

    const boardBody = columns.map(columnID => {
        const column = board.columns[columnID];
        return (<BoardColumn
            key={column.id}
            id={column.id}
            name={column.name}
        />);
    });

    return (
        <div className='board__body'>
            <div className='board__columns'>
                {boardBody}
                <BoardAddColumnButton/>
            </div>

            <BoardSettings/>
        </div>
    );
}