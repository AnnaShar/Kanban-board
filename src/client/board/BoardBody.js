import React, {useContext, useEffect, useState} from 'react';
import {BoardColumn} from '../board-column/BoardColumn.js';
import {DragDropContext} from 'react-beautiful-dnd';
import serverRequest from '../server-requests.js';
import {BoardSettings} from '../board-settings/BoardSettings.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import './BoardBody.css';
import {BoardAddColumnButton} from './BoardAddColumnButton.js';


export const BoardBody = (props) => {
    const {board, addColumn} = useContext(BoardStoreContext);

    const columns = board.columnsOrder;

    const boardBody = columns.map(columnID => {
        const column = board.columns[columnID];
        return (<BoardColumn
            key={column.id}
            id={column.id}
            name={column.name}
        />);
    });

    const addNewColumn = (columnName) => {
        addColumn('Untitled');
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
            <div className='board__columns'>
                <DragDropContext
                    onDragEnd={onDragEnd}>
                    {boardBody}
                    <BoardAddColumnButton/>
                </DragDropContext>
            </div>
            {props.settingsIsOpen && <BoardSettings/>}
        </div>
    );
}