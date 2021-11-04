import React, {useContext, useEffect, useState} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import boardController from '../board-api-controller.js';
import './Board.css';

export const Board = (props) => {
    const [board, setBoard] = useState(null);
    const {theme: [theme, setTheme]} = useContext(UserSettingsContext);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(async () => {
        const boardData = await boardController.createBoard();
        setBoard(boardData);
    }, []);

    const openSettings = () => {
        setSettingsOpen(!settingsOpen);
    }

    const styles = {
        background: "linear-gradient(135deg," + theme + ", transparent)"
    }

    return (
        <>
            {board &&
            <div className='board' style={styles}>
                <BoardHeader name={board.name}
                             changeTheme={props.changeTheme}
                             openSettings={openSettings}
                />
                <BoardBody columns={board.columns}
                           tasks={board.tasks}
                           settingsIsOpen={settingsOpen}
                />

            </div>}
        </>
    );
}