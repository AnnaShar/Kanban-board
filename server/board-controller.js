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
    return Object.values(board.columns);
}

const getTasksByColumn = (columnID) => {
    const board = getBoard();
    const column = board.columns[columnID];
    if (column) {
        const tasksIDs = column.tasksOrder;
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
    let tasksOrder = column.tasksOrder;

    if (tasksOrder.length === 0 || tasksOrder.length === index ) {
        tasksOrder.push(taskID);
    } else {
        tasksOrder = tasksOrder.splice(index, 0, taskID)
    }
    return {
        ...column,
        tasksOrder: tasksOrder
    }
}

const removeTaskFromColumn = (column, taskID) => {
    return {
        ...column,
        tasksOrder: column.tasksOrder.filter(task => task !== taskID)
    }
}


const moveTaskToDifferentColumn = (taskID, destination) => {
    const board = getBoard();

    let task = board.tasks[taskID];
    if (!task) throw new RequestError(404, `Task with id ${taskID} does not found.`);

    const sourceColumn = board.columns[task.columnID];
    const destinationColumn = board.columns[destination.columnID];

    if (!sourceColumn || !destinationColumn) throw new RequestError(400, `Bad request. Wrong ids for source or destination column.`);

    board.tasks[taskID] = updateTask(task, {columnID: destinationColumn.id});
    board.columns[sourceColumn.id] = removeTaskFromColumn(sourceColumn, taskID);
    board.columns[destinationColumn.id] = addTaskToColumn(destinationColumn, taskID, destination.index);

    updateBoardFile();
}

const updateTask = (task, newProperties) => {
    return {
        ...task,
        ...newProperties
    }
}

export const addTask = (columnID, task) => {
    const board = getBoard();

    const newTaskID = getNewTaskID();
    const newTask = {
        ...task,
        id: newTaskID,
        columnID: columnID
    };

    board.tasks[newTaskID] = newTask;
    board.columns[columnID].tasksOrder.push(newTaskID);

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