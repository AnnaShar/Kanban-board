import React, {useContext, useEffect, useState} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import {ThemeContext, themes} from '../context-store/theme-context.js';
import serverRequest from '../server-requests.js';
import boardController from '../board-api-controller.js';
import './Board.css';

export const Board = () => {
    const [board, setBoard] = useState(null);
    const {theme, setTheme} = useContext(ThemeContext);
    const [themeState, setThemeState] = useState(themes.blue);

    useEffect(async () => {
        // const boardData = await serverRequest.getBoard();
        const boardData = await boardController.createBoard();
        setBoard(boardData);
    }, []);

    const changeTheme = () => {
        console.log('change theme');
        setTheme(themes.green);
    }

    return (

        <ThemeContext.Provider value={themeState}>

            {board &&
            <div className='board'
                 style={{background: theme.background}}>
                <BoardHeader name={board.name}
                             changeTheme={changeTheme}
                />
                <BoardBody columns={board.columns}
                           tasks={board.tasks}
                />

            </div>}

        </ThemeContext.Provider>
    );
}