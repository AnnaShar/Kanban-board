import React, {useContext, useEffect, useState} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import boardController from '../board-api-controller.js';
import './Board.css';

export const Board = () => {
    const {board, setBoard} = useContext(BoardStoreContext);
    const {theme: [theme, setTheme]} = useContext(UserSettingsContext);

    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(async () => {
        const boardData = await boardController.createBoard();
        setBoard(boardData);
    }, []);

    const openSettings = () => {
        setSettingsOpen(!settingsOpen);
    }

    const boardStyles = {
        background: "linear-gradient(135deg," + theme + ", transparent)"
    }

    return (
        <>
            {board &&
            <div className='board' style={boardStyles}>
                <BoardHeader
                    name={board.name}
                    openSettings={openSettings}
                />
                <BoardBody
                    settingsIsOpen={settingsOpen}
                />
            </div>}
        </>
    );
}