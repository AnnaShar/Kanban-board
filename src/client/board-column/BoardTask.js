import React from 'react';
import {DraggableContainer} from '../drag-drop-components/DraggableContainer.js';
import './BoardTask.css';

export const BoardTask = ({task, index}) => {

    return (
        <DraggableContainer
            draggableId={task.id}
            index={index}
            type='task'
            className={`board-column__item board-column__task ${task.isDeleting ? 'isDeleting' : ''}`}>

            {task.name}

        </DraggableContainer>
    );
}