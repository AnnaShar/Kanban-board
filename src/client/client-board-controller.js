import React from 'react';
import serverRequest from './client-requests-api.js';
import history from './history.js';


const getBoard = async () => {
    try {
        return await serverRequest.getBoard();
    } catch (e) {
        history.push('/error');
    }
}

const addColumn = async (columnName) => {
    let newColumn = null;
    try {
        newColumn = await serverRequest.addColumn(columnName);
    } catch (e) {
        //TODO show toaster with error
        alert('Не получилось чего-то на сервере');
    }
    return newColumn;
}

const addTask = async (task, columnID) => {
    let newTask = null;
    try {
        newTask = await serverRequest.addTask(task, columnID);
    } catch (e) {
        //TODO show toaster with error
        alert('Не получилось чего-то на сервере');
    }
    return newTask;
}

const moveTask = async (taskID, source, destination) => {
    try {
        await serverRequest.moveTask(taskID, source, destination);
        return true;
    } catch (e) {
        //TODO show toaster with error
        alert('Не получилось чего-то на сервере');
    }
    return false;
}

const deleteTask = async(taskID, columnID) => {
    try {
        await serverRequest.deleteTask(taskID, columnID);
        return true;
    } catch (e) {
        //TODO show toaster with error
        alert('Не получилось чего-то на сервере');
    }
    return false;
}

export default {
    getBoard,
    addColumn,
    addTask,
    moveTask,
    deleteTask
}