import React, {useState, useEffect} from 'react';

export const BoardTask = (props) => {
    const handleDragStart = (e) => {
        e.target.style.opacity = '0.4';

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    const handleDragEnd = (e)=> {
        e.target.style.opacity = '1';
    }

    return (
            <div
                draggable="true"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="board-column__item board-column__task">
                {props.task}
            </div>
    );
}