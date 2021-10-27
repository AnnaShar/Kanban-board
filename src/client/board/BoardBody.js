import React, {useEffect, useState} from 'react';
import {BoardColumn} from '../board-column/BoardColumn.js';
import {DragDropContext} from 'react-beautiful-dnd';
import serverRequest from '../server-requests.js';
import './BoardBody.css';


export const BoardBody = (props) => {
    const [columns, setColumns] = useState([]);

    useEffect(async () => {
        const columnsData = await serverRequest.getColumns();
        setColumns(columnsData);
    }, []);

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

    const onDragEnd = async (result) => {
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }
        const destinationInfo = {
            index: destination.index,
            columnID: destination.droppableId
        }
        const newColumns = await serverRequest.moveTask(draggableId, destinationInfo);
        //setColumns(newColumns);
    }

    return (
        <div className='board__body'>
            <DragDropContext
                onDragEnd={onDragEnd}>
                {boardBody}

                <div className='board__add-column-button'
                     onClick={addColumn}
                > +
                </div>

            </DragDropContext>
        </div>
    );
}