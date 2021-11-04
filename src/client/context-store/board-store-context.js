import React, {useState} from 'react';

export const BoardStoreContext = React.createContext(null);

export default ({children}) => {
    const [board, setBoard] = useState(null);

    const addColumn = (columnName) => {

    };

    const addTask = (task, columnID) => {
        let newBoard = board;
        board.tasks.push[task.id] = task;
        board.columns[columnID].tasks.push(task.id);
        setBoard(newBoard);
    };

    const boardContext = {
        board: board,
        setBoard:setBoard,
        addColumn:addColumn,
        addTask: addTask
    }

    return <BoardStoreContext.Provider value={boardContext}>{children}</BoardStoreContext.Provider>;
}