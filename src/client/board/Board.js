import React, {useContext, useEffect} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import {BoardFooter} from './BoardFooter.js';
import {DragDropContextContainer} from '../drag-drop-components/DragDropContextContainer.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';

import './Board.css';

export const Board = () => {
    const {board, loadBoardData, moveTask, deleteTask, moveColumn, deleteColumn} = useContext(BoardStoreContext);
    const {theme} = useContext(UserSettingsContext);

    useEffect(async () => {
        await loadBoardData()
    }, []);

    const boardStyles = {
        background: 'linear-gradient(135deg,' + theme.base + ', transparent)'
    }

    return (
        <>
            {board &&
            <div className='board'
                 style={boardStyles}>
                <DragDropContextContainer
                    moveTask={moveTask}
                    deleteTask={deleteTask}
                    moveColumn={moveColumn}
                    deleteColumn={deleteColumn}>

                    <BoardHeader
                        name={board.name}
                    />

                    <BoardBody/>

                    <BoardFooter/>

                </DragDropContextContainer>
            </div>}
        </>
    );
}