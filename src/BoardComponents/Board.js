import React, {useEffect, useState} from 'react';
import {BoardHeader} from './BoardHeader.js';
import {BoardBody} from './BoardBody.js';
import serverRequest from '../server-requests.js';

export const Board = () => {
    const [board, setBoard] = useState(null);

    useEffect(async () => {
        const boardData = await serverRequest.getBoardInfo('b1');
        setBoard(boardData);
    });

    return (
        <div className='board'>
            <BoardHeader name={board?.name}/>
            <BoardBody columns={board?.columns}/>
        </div>
    );
}