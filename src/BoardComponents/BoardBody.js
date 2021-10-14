import {BoardColumn} from "../BoardColumnComponents/BoardColumn.js";
import React, {useState} from 'react';

export const BoardBody = (props) => {
    const [newColumns, setNewColumns] = useState([]);
    const columns = props.columns.map(column =>
        <BoardColumn
            key={column.id}
            name={column.name}
            tasks={column.tasks}
        />
    );
    const addColumn = (e) => {
        setNewColumns(newColumns => newColumns.concat({name: 'Untitled', tasks: []}))
    }
    return (
        <div className="board__body">
            {columns}
            {newColumns && newColumns.map((column, i) =>
                <BoardColumn
                    key={i+10}
                    name={column.name}
                    tasks={column.tasks}
                />
            )}
            <div className="board__add-column-button"
                 onClick={addColumn}
            > +
            </div>
        </div>
    );
}