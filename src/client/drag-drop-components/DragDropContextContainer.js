import React, {useContext} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {TrashCanContext} from '../context-store/trash-can-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';

export const DragDropContextContainer = ({children, moveTask, deleteTask, moveColumn, deleteColumn}) => {
    const {showTrashCan, hideTrashCan, setDeletingType} = useContext(TrashCanContext);
    const {setDeletingTaskState, setDeletingTaskColumn} = useContext(BoardStoreContext);

    const onDragStart = ({type}) => {
        showTrashCan();
        setDeletingType(type);
    }

    const onDragUpdate = (result) => {
        const {destination, draggableId, type} = result;
        if (!destination) {
            setDeletingTaskState(draggableId, false);
            return;
        }
        switch (type) {
            case 'column':
                updateColumn(draggableId, destination);
                break;

            case 'task':
                updateTask(draggableId, destination);
                break;
        }
    }

    const onDragEnd = (result) => {
        console.log(result)
        hideTrashCan();

        const {draggableId, source, destination, type} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        switch (type) {
            case 'column':
                dropColumn(draggableId, source, destination);
                break;

            case 'task':
                dropTask(draggableId, source, destination);
                break;
        }
    }

    const updateTask = (draggableId, destination) => {
        if (destination.droppableId === 'trash-can-task') {
            setDeletingTaskState(draggableId, true);
        } else {
            setDeletingTaskState(draggableId, false);
        }
    }

    const updateColumn = (draggableId, destination) => {
        if (destination.droppableId === 'trash-can-column') {
            setDeletingTaskColumn(draggableId, true);
        } else {
            setDeletingTaskColumn(draggableId, false);
        }
    }

    const dropTask = (draggableId, source, destination) => {
        if (destination.droppableId === 'trash-can-task') {
            deleteTask(draggableId, source.droppableId)
        } else {
            moveTask(draggableId,
                {id: source.droppableId, index: source.index},
                {id: destination.droppableId, index: destination.index});
        }
    }

    const dropColumn = (draggableId, source, destination) => {
        if (destination.droppableId === 'trash-can-column') {
            //TODO ask before delete
            deleteColumn(draggableId);
        } else {
            moveColumn(draggableId, source.index, destination.index);
        }
    }

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}>
            {children}
        </DragDropContext>
    );
}