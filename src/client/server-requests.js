import RequestError from './error.js';

const url = '/api/board';

const handleRequest = async (handler) => {
    const response = await handler();
    // console.log('response handled')
    if (!response.ok) {
        // console.log('response not ok')
        const errorMessage = await response.text();
        throw new RequestError(response.status, errorMessage);
    } else {
        // console.log('not else')
        return await response.json();
    }
};

const getAllTasks = async () => {
    return handleRequest(async () => {
        return await fetch(`${url}/tasks`);
    });
};

const getBoard = async () => {
    return handleRequest(async () => {
        return await fetch(`${url}`);
    });
};

const getColumns = async () => {
    return handleRequest(async () => {
        return await fetch(`${url}/columns`);
    });
};

const getTasksByColumn = async (columnID) => {
    return handleRequest(async () => {
        return await fetch(`${url}/columns/${columnID}`);
    });
};

const getBoardInfo = async () => {
    return handleRequest(async () => {
        return await fetch(`${url}`);
    });
};

const moveTask = async (taskID, destination) => {
    return handleRequest(async () => {
        return await fetch(`${url}/tasks/move/${taskID}`, {
            method: 'PATCH',
            body: JSON.stringify(destination)
        });
    });

};

const addTask = async (task, columnID) => {
    return handleRequest(async () => {
        const response =  await fetch(`${url}/tasks/add/${columnID}`, {
            method: 'POST',
            body: JSON.stringify(task)
        });
        console.log('response received')
        return response;
    });

};

export default {
    getBoard,
    getAllTasks,
    getColumns,
    getTasksByColumn,
    getBoardInfo,
    moveTask,
    addTask
}