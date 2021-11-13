import React, {useState} from 'react';
import boardController from '../client-board-controller.js';

export const BoardStoreContext = React.createContext(null);

export default ({children}) => {
    const [board, setBoard] = useState(null);

    const addColumn = async (columnName) => {
        const newColumn = await boardController.addColumn(columnName);

        if (newColumn) {
            const newColumnsOrder = [...board.columnsOrder, newColumn.id];
            const newBoard = {
                ...board,
                columnsOrder: newColumnsOrder,
                columns: {
                    ...board.columns,
                    [newColumn.id]: newColumn
                }
            }
            setBoard(newBoard);
        }
    };

    const addTask = async (task, columnID) => {
        const newTask = await boardController.addTask(task, columnID);

        if (newTask) {
            const tasksOrder = [...board.columns[columnID].tasks, newTask.id];
            const newBoard = {
                ...board,
                columns: {
                    ...board.columns,
                    [columnID]: {
                        ...board.columns[columnID],
                        tasks: tasksOrder
                    }
                },
                tasks: {
                    ...board.tasks,
                    [newTask.id]: newTask
                }
            }
            setBoard(newBoard);
        }
    };

    const editColumnName = (columnID, columnName) => {
        const newBoard = {
            ...board,
            columns: {
                ...board.columns,
                [columnID]: {
                    ...board.columns[columnID],
                    name: columnName
                }
            }
        };

        setBoard(newBoard);
    }

    const moveTask = async (taskID, source, destination) => {
        const backupBoard = {...board};

        let newBoard = {...board};
        newBoard.columns[source.id].tasks.splice(source.index, 1);
        newBoard.columns[destination.id].tasks.splice(destination.index, 0, taskID);

        setBoard(newBoard);

        const movedSuccessfully = await boardController.moveTask(taskID, source, destination);
        if (!movedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const deleteTask = async (taskID, columnID) => {
        const backupBoard = {...board};
        const columnTasks = board.columns[columnID].tasks.filter(task => task !== taskID);
        const {[taskID]: removedTask, ...restTasks} = board.tasks;

        setBoard(previousBoard => ({
            ...previousBoard,
            columns: {
                ...previousBoard.columns,
                [columnID]: {
                    ...previousBoard.columns[columnID],
                    tasks: columnTasks
                }
            },
            tasks: restTasks
        }));

        const deletedSuccessfully = await boardController.deleteTask(taskID, columnID);
        if (!deletedSuccessfully) {
            setBoard(backupBoard);
        }
    }

    const setDeletingTaskState = (taskID, isDeleting) => {
        setBoard(previousBoard => ({
            ...previousBoard,
            tasks: {
                ...previousBoard.tasks,
                [taskID]: {
                    ...previousBoard.tasks[taskID],
                    isDeleting: isDeleting
                }
            }
        }));
    }

    const boardContext = {
        board,
        setBoard,
        addColumn,
        addTask,
        editColumnName,
        moveTask,
        deleteTask,
        setDeletingTaskState
    }

    return <BoardStoreContext.Provider value={boardContext}>{children}</BoardStoreContext.Provider>;
}