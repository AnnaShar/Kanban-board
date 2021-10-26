import React from 'react';
import serverRequest from './server-requests.js';
import {ErrorPage} from './error/ErrorPage.js';
import {Board} from './board/Board.js';

let board = null;

const createBoard = async() => {
    try {
        const boardData = await getBoard();
        return (<Board board={boardData}/>);
    } catch (e) {
        return (<ErrorPage message={e.message}/>);
    }
}
const getBoard = async() => {
    if (!board) {
        try {
            board = await serverRequest.getBoard();
            return board;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

export default {
    createBoard
}