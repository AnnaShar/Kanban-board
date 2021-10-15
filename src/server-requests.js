import RequestError from './error.js';

const url = '/api/board';

const handleRequest = async (handler) => {
    const response = await handler();

    if (response.status !== 200) {
        throw new RequestError(response.status, 'Board not found');
    }
    return await response.json();
};

const getAllTasks = async () => {
    return handleRequest(async () => {
        return await fetch(`${url}/tasks`);
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

const getBoardInfo = async (boardID) => {
    return handleRequest(async () => {
        return await fetch(`${url}/${boardID}`);
    });
};

export default {
    getAllTasks,
    getColumns,
    getTasksByColumn,
    getBoardInfo
}