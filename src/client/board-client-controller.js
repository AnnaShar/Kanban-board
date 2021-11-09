import React from 'react';
import serverRequest from './server-requests.js';
import history from './history.js';

let board = null;

const createBoard = async() => {
    try {
        return await getBoard();
    } catch (e) {
        history.push('/error');
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