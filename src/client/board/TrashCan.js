import React, {useContext} from 'react'
import DeleteIcon from '../images/delete_icon.svg';
import {Droppable} from 'react-beautiful-dnd';
import {TrashCanContext} from "../context-store/trash-can-context.js";

import './TrashCan.css';


export const TrashCan = () => {
    const {trashCanActive} = useContext(TrashCanContext);

    return (
        <>
            <Droppable droppableId='trash-can-container'>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`trash-can ${trashCanActive ? 'show' : 'hide'}`}>

                        <DeleteIcon/>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
}