import React from 'react';
import serverRequest from './client-requests-api.js';
import {showErrorMessage} from './utils/notifier.js';
import texts from './constants/texts.js';
import history from './history.js';

const handleRequest = async (handler) => {
    showErrorMessage(texts.errorMessages.default);
    try {
        return await handler();
    } catch (e) {
        showErrorMessage(texts.errorMessages.default);
    }
}

const getBoard = async () => {
    try {
        return await serverRequest.getBoard();
    } catch (e) {
        history.push('/error');
    }
}

const addColumn = async (columnName) => {
    return handleRequest(async () => {
        return await serverRequest.addColumn(columnName);
    });
}

const addTask = async (task, columnID) => {
    return handleRequest(async () => {
        return await serverRequest.addTask(task, columnID);
    });
}

const moveTask = async (taskID, source, destination) => {
    return handleRequest(async () => {
        return await serverRequest.moveTask(taskID, source, destination);
    });
}

const deleteTask = async (taskID, columnID) => {
    return handleRequest(async () => {
        return await serverRequest.deleteTask(taskID, columnID);
    });
}

const moveColumn = async (columnID, sourceIndex, destinationIndex) => {
    return handleRequest(async () => {
        return await serverRequest.moveColumn(columnID, sourceIndex, destinationIndex);
    });
}

const deleteColumn = async (columnID) => {
    return handleRequest(async () => {
        return await serverRequest.deleteColumn(columnID);
    });
}

const changeColumnName = async (columnID, columnName) => {
    return handleRequest(async () => {
        return await serverRequest.changeColumnName(columnID, columnName);
    });
}

const changeBoardName = async (boardName) => {
    return handleRequest(async () => {
        return await serverRequest.changeBoardName(boardName);
    });
}
const changeTaskName = async (taskID, taskName) => {
    return handleRequest(async () => {
        return await serverRequest.changeTaskName(taskID, taskName);
    });
}

export default {
    getBoard,
    addColumn,
    addTask,
    moveTask,
    deleteTask,
    moveColumn,
    deleteColumn,
    changeColumnName,
    changeBoardName,
    changeTaskName
}