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

const addColumn = async (columnName) => {
    let newColumn = null;
    try{
        newColumn = await serverRequest.addColumn(columnName);
    }
    catch(e){
        //TODO show toaster with error
        alert('Не получилось чего-то на сервере');
    }
    return newColumn;
}

const addTask = async (task, columnID) => {
    let newTask = null;
    try{
        newTask = await serverRequest.addTask(task, columnID);
    }
    catch(e){
        //TODO show toaster with error
        alert('Не получилось чего-то на сервере');
    }
    return newTask;
}

export default {
    createBoard,
    addColumn,
    addTask
}