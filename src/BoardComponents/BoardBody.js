import React, {useEffect, useState} from 'react';
import {BoardColumn} from '../BoardColumnComponents/BoardColumn.js';
import serverRequest from '../server-requests.js';

export const BoardBody = (props) => {
    const [columns, setColumns] = useState([]);

    useEffect(async () => {
        const columnsData = await serverRequest.getColumns();
        setColumns(columnsData);
    });

    const boardBody = columns.map(column =>
        <BoardColumn
            key={column.id}
            id={column.id}
            name={column.name}
        />
    );

    const addColumn = (e) => {
        setColumns(columns => columns.concat({name: 'Untitled', tasks: []}))
    }
    return (
        <div className='board__body'>
            {boardBody}
            <div className='board__add-column-button'
                 onClick={addColumn}
            > +
            </div>
        </div>
    );
}