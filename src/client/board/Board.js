import React, {useContext, useEffect, useState} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import {ThemeContext, themes} from '../context-store/theme-context.js';
import serverRequest from '../server-requests.js';
import './Board.css';

export const Board = () => {
    const [board, setBoard] = useState(null);
    const theme = useContext(ThemeContext);
    const [themeState, setThemState] = useState(themes.blue);

    useEffect(async () => {
        const boardData = await serverRequest.getBoard();
        setBoard(boardData);
    }, []);

    const changeTheme = () => {
        setThemState(themes.green);
    }

    return (

        <ThemeContext.Provider value={themeState}>

            {board &&
            <div className='board'
                 style={{background: theme.background}}>
                <BoardHeader name={board.name}/>
                <BoardBody columns={board.columns}
                           tasks={board.tasks}
                           changeTheme={changeTheme}
                />
            </div>}

        </ThemeContext.Provider>
    );
}