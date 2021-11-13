import React, {useContext} from 'react';
import {BoardTask} from './BoardTask.js';
import {BoardColumnHeader} from './BoardColumnHeader.js';
import {BoardAddTaskButton} from './BoardAddTaskButton.js';
import {Droppable} from 'react-beautiful-dnd';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import './BoardColumn.css';


export const BoardColumn = (props) => {
    const {board} = useContext(BoardStoreContext);

    const tasks = board.columns[props.id].tasks.map(taskID => board.tasks[taskID]);

    const columnBody = tasks.map((task, index) =>
        <BoardTask
            key={task.id}
            task = {task}
            index={index}
        />
    );

    return (
        <div className='board__board-column board-column'>

            <BoardColumnHeader name={props.name}
                               id={props.id}
            />

            <Droppable droppableId={props.id}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className='board_column__body'>
                        {columnBody}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <BoardAddTaskButton
                columnID={props.id}
            />
        </div>
    );
}