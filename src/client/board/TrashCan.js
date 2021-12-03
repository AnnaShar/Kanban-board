import React, {useState, useContext, useEffect} from 'react'
import DeleteIcon from '../images/delete_icon.svg';
import {DroppableContainer} from '../drag-drop-components/DroppableContainer.js';
import {TrashCanContext} from '../context-store/trash-can-context.js';

import './TrashCan.css';


export const TrashCan = () => {
    const {trashCanActive, deletingType} = useContext(TrashCanContext);
    const [showColumnTrash, setShowColumnTrash] = useState(false);
    const [showTaskTrash, setShowTaskTrash] = useState(false);

    useEffect(() => {
        setShowTaskTrash(trashCanActive && deletingType === 'task');
        setShowColumnTrash(trashCanActive && deletingType === 'column');
    }, [deletingType, trashCanActive])

    return (
        <>
            <DroppableContainer
                droppableId='trash-can-column'
                direction='horizontal'
                type='column'
                className={`trash-can ${showColumnTrash ? 'trash-can--shown' : 'trash-can--hidden'}`}>

                <DeleteIcon/>

            </DroppableContainer>

            <DroppableContainer
                droppableId='trash-can-task'
                direction='horizontal'
                type='task'
                className={`trash-can ${showTaskTrash ? 'trash-can--shown' : 'trash-can--hidden'}`}>

                <DeleteIcon/>

            </DroppableContainer>
        </>
    );
}