import React, {useEffect, useState} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import serverRequest from '../server-requests.js';
import './Board.css';

export const Board = () => {
    const [board, setBoard] = useState(null);

    useEffect(async () => {
        const boardData = await serverRequest.getBoard();
        setBoard(boardData);
    }, []);

    return (
        <>
            {board &&
            <div className='board'>
                <BoardHeader name={board.name}/>
                <BoardBody columns={board.columns}
                           tasks={board.tasks}/>
            </div>}
        </>
    );
}