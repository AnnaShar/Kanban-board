import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import './BoardTask.css';

export const BoardTask = ({task, index}) => {

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) =>
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`board-column__item board-column__task ${task.isDeleting ? 'isDeleting': ''}`}>
                    {task.name}
                </div>
            }
        </Draggable>
    );
}