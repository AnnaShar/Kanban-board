import React, {useContext, useEffect, useState} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import {BoardFooter} from './BoardFooter.js';
import {DragDropContextContainer} from '../drag-drop-components/DragDropContextContainer.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import boardController from '../client-board-controller.js';

import './Board.css';

export const Board = () => {
    const {board, setBoard, moveTask, deleteTask} = useContext(BoardStoreContext);
    const {theme} = useContext(UserSettingsContext);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(async () => {
        const boardData = await boardController.getBoard();
        setBoard(boardData);
    }, []);

    const openSettings = () => {
        setSettingsOpen(!settingsOpen);
    }

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
                    deleteTask={deleteTask}>

                    <BoardHeader
                        name={board.name}
                    />
                    <BoardBody
                        settingsIsOpen={settingsOpen}
                    />
                    
                    <BoardFooter/>

                </DragDropContextContainer>
            </div>}
        </>
    );
}