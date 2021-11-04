import React, {useState} from 'react';

export const BoardStoreContext = React.createContext(null);

export default ({children}) => {
    const [board, setBoard] = useState(null);

    const addTask = (task, columnID) => {
        let newBoard = board;
        board.tasks.push(task);
    }

    const boardContext = {
        board: board,
        columns: board.columns,
        tasks: board.tasks,
        addTask: addTask
    }

    return <BoardStoreContext.Provider value={boardContext}>{children}</BoardStoreContext.Provider>;
}