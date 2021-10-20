import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

export const BoardTask = (props) => {

    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) =>
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className='board-column__item board-column__task'>
                    {props.task}
                </div>
            }
        </Draggable>
    );
}