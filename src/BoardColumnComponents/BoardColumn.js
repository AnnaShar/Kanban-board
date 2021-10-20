import React, {useState, useEffect} from 'react';
import {BoardTask} from './BoardTask.js';
import {BoardColumnHeader} from './BoardColumnHeader.js';
import {BoardAddTaskButton} from './BoardAddTaskButton.js';
import {Droppable} from 'react-beautiful-dnd';
import serverRequest from '../server-requests.js';


export const BoardColumn = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        const tasksData = await serverRequest.getTasksByColumn(props.id);
        setTasks(tasksData);
    }, []);

    const columnBody = tasks.map((task, index) =>
        <BoardTask
            key={task.id}
            id={task.id}
            task={task.name}
            index={index}
        />
    );

    const addToDatabase = async (taskName) => {
        const newTask = await serverRequest.addTask({name: taskName}, props.id);
        //TODO realize why board updates even if you remove next line
        setTasks(tasksData => tasksData.concat(newTask));
    }

    const keyPressed = ({key}, taskName) => {
        if (key === 'Enter' && taskName) {
            addToDatabase(taskName);
        }
    }

    return (
        <div className='board__board-column board-column'>

            <BoardColumnHeader name={props.name}/>

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
                keyPressed={keyPressed}
            />
        </div>
    );
}