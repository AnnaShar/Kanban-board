import {DragDropContext} from "react-beautiful-dnd";
import {TrashCanContext} from "../context-store/trash-can-context.js";
import React, {useContext} from "react";
import {BoardStoreContext} from "../context-store/board-store-context.js";

export const DragDropContainer = ({children, moveTask, deleteTask}) => {
    const {showTrashCan, hideTrashCan} = useContext(TrashCanContext);
    const {setDeletingTaskState} = useContext(BoardStoreContext);

    const onDragStart = () => {
        showTrashCan();
    }

    const onDragUpdate = (result) => {
        const {destination, draggableId} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === 'trash-can-container') {
            setDeletingTaskState(draggableId, true);
        } else {
            setDeletingTaskState(draggableId, false);
        }
    }

    const onDragEnd = (result) => {
        hideTrashCan();

        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        if (destination.droppableId === 'trash-can-container') {
            deleteTask(draggableId, source.droppableId)
        } else {
            moveTask(draggableId,
                {id: source.droppableId, index: source.index},
                {id: destination.droppableId, index: destination.index});
        }

    }

    const dropTask = () => {

    }

    const dropColumn = () => {

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