import {getDataFromFile, updateFile} from './file-data-handler.js';
import config from './config.js';
import RequestError from './request-error.js';

const filePath = config['tasksFilePath'];
let board = null;

const getBoard = () => {
    if (!board) {
        try {
            board = getDataFromFile(filePath);
        } catch (e) {
            throw new RequestError(404, 'Tasks not found.');
        }
    }
    return board;
};

const getAllTasks = () => {
    const board = getBoard();
    return Object.values(board.tasks);
}

const getColumns = () => {
    const board = getBoard();
    return board.columns;
}

const getTasksByColumn = (columnID) => {
    const board = getBoard();
    return Object.values(board.tasks).filter(task => task.columnID === columnID);
}

const getBoardInfo = () => {
    const board = getBoard();
    return {
        id: board.id,
        name: board.name,
        columns: board.columns
    }
}

const moveTaskToDifferentColumn = (taskID, columnID) => {
    const board = getBoard();

    let task = board.tasks[taskID];
    if (!task) throw new RequestError(404, `Task with id ${taskID} does not found.`);

    board.tasks[taskID] = {
        ...task,
        columnID: columnID
    };
    updateBoardFile();
}

export const addTask = (columnID, task) => {
    const board = getBoard();

    const newTaskID = getNewTaskID();
    const newTask = {
        ...task,
        id:newTaskID,
        columnID:columnID
    };

    board.tasks[newTaskID] = newTask;

    updateBoardFile();

    return newTask;
};

const updateBoardFile = () => {
    const board = getBoard();

    try {
        updateFile(filePath, board);
    } catch (e) {
        throw new RequestError(500, 'Data updating error.');
    }
};

const getNewTaskID = () => {
    const board = getBoard();
    const newID = board.metaData.lastTaskID + 1;

    board.metaData.lastTaskID = newID;
    updateBoardFile();

    return `t${newID}`;
}

export default {
    getAllTasks,
    getColumns,
    getTasksByColumn,
    getBoardInfo,
    moveTaskToDifferentColumn,
    addTask
}