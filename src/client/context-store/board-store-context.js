import React, {useState} from 'react';
import boardController from '../board-client-controller.js';

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

        if (newTask){
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

    const boardContext = {
        board: board,
        setBoard: setBoard,
        addColumn: addColumn,
        addTask: addTask
    }

    return <BoardStoreContext.Provider value={boardContext}>{children}</BoardStoreContext.Provider>;
}