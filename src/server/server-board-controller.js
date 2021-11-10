import {getDataFromFile, updateFile} from './file-data-handler.js';
import config from './config.js';
import RequestError from './request-error.js';

const filePath = config['tasksFilePath'];
let board = null;

const getBoard = () => {
    //throw new RequestError(404, `AAAAAA it's not working.`);
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
    return Object.values(board.columns);
}

const getTasksByColumn = (columnID) => {
    const board = getBoard();
    const column = board.columns[columnID];
    if (column) {
        const tasksIDs = column.tasks;
        return tasksIDs.map(id => board.tasks[id]);
    } else {
        throw new RequestError(404, `There is no column with id ${columnID}.`);
    }
}

const getBoardInfo = () => {
    const board = getBoard();
    return {
        id: board.id,
        name: board.name,
        columns: Object.values(board.columns)
    }
}

const addTaskToColumn = (column, taskID, index) => {
    let tasks = column.tasks;

    if (tasks.length === 0 || tasks.length === index) {
        tasks.push(taskID);
    } else {
        tasks.splice(index, 0, taskID)
    }
    return {
        ...column,
        tasks: tasks
    }
}

const removeTaskFromColumn = (column, taskID) => {
    return {
        ...column,
        tasks: column.tasks.filter(task => task !== taskID)
    }
}


const moveTask = (taskID, {source, destination}) => {
    const board = getBoard();
    let task = board.tasks[taskID];

    if (!task) throw new RequestError(404, `Task with id ${taskID} does not found.`);
    if (!board.columns[source.id]) throw new RequestError(400, `Bad request. Source column is not found.`);
    if (!board.columns[destination.id]) throw new RequestError(400, `Bad request. Destination column is not found.`);

    board.columns[source.id].tasks.splice(source.index, 1);
    board.columns[destination.id].tasks.splice(destination.index, 0, taskID);

    updateBoardFile();
    return true;
}

const updateTask = (task, newProperties) => {
    return {
        ...task,
        ...newProperties
    }
}

const addTask = (columnID, task) => {
    const board = getBoard();

    const newTaskID = getNewTaskID();
    const newTask = {
        id: newTaskID,
        ...task
    };

    board.tasks[newTaskID] = newTask;
    board.columns[columnID].tasks.push(newTaskID);

    updateBoardFile();

    return newTask;
};

const addColumn = ({columnName}) => {
    const board = getBoard();

    const newColumnID = getNewColumnID();
    const newColumn = {
        id: newColumnID,
        name: columnName,
        tasks: []
    };

    board.columns[newColumnID] = newColumn;
    board.columnsOrder.push(newColumnID);

    updateBoardFile();

    return newColumn;
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
    const newID = board.metadata.lastTaskID + 1;

    board.metadata.lastTaskID = newID;
    updateBoardFile();

    return `t${newID}`;
}
const getNewColumnID = () => {
    const board = getBoard();
    const newID = board.metadata.lastColumnID + 1;

    board.metadata.lastColumnID = newID;
    updateBoardFile();

    return `c${newID}`;
}

export default {
    getBoard,
    getAllTasks,
    getColumns,
    getTasksByColumn,
    getBoardInfo,
    moveTask,
    addTask,
    addColumn
}