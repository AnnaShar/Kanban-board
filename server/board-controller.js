import {getDataFromFile} from './file-data-handler.js';
import config from './config.js';
import RequestError from './request-error.js';

const filePath = config['tasksFilePath'];
let board = null;

const getBoard = () => {
    if (!board) {
        try {
            board = getDataFromFile(filePath)["b1"];
        } catch (e) {
            throw new RequestError(404, 'Tasks not found.');
        }
    }
    return board;
};

const getAllTasks = () => {
    const board = getBoard();
    return board.tasks;
}

const getColumns = () => {
    const board = getBoard();
    return board.columns;
}

const getTasksByColumn = (columnId) => {
    const board = getBoard();
    const tasks = board.tasks.filter(task => task.columnId === columnId);
    return tasks;
}

export default {
    getAllTasks,
    getColumns,
    getTasksByColumn
}