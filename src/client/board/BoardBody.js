import React, {useContext} from 'react';
import {BoardColumn} from '../board-column/BoardColumn.js';
import {DragDropContext} from 'react-beautiful-dnd';
import {BoardSettings} from '../board-settings/BoardSettings.js';
import {BoardAddColumnButton} from './BoardAddColumnButton.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import './BoardBody.css';


export const BoardBody = (props) => {
    const {board, moveTask} = useContext(BoardStoreContext);

    const columns = board.columnsOrder;

    const boardBody = columns.map(columnID => {
        const column = board.columns[columnID];
        return (<BoardColumn
            key={column.id}
            id={column.id}
            name={column.name}
        />);
    });

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        moveTask(draggableId,
            {id: source.droppableId, index: source.index},
            {id: destination.droppableId, index: destination.index});
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