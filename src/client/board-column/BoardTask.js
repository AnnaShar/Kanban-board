import React, {useContext} from 'react';
import {DraggableContainer} from '../drag-drop-components/DraggableContainer.js';
import {EditableTextArea} from '../service-components/EditableTextArea.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';

import './BoardTask.css';


export const BoardTask = ({task, index}) => {

    const {changeTaskName} = useContext(BoardStoreContext);

    const saveTaskName = (name) => {
        changeTaskName(task.id, name)
    }

    return (
        <DraggableContainer
            draggableId={task.id}
            index={index}
            type='task'
            className={`board-column__item board-column__task ${task.isDeleting ? 'isDeleting' : ''}`}>

            <EditableTextArea
                className='task'
                text={task.name}
                saveChanges={saveTaskName}
            />

        </DraggableContainer>
    );
}