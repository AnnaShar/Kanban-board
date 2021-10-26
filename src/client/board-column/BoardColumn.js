import React, {useState, useEffect} from 'react';
import {BoardTask} from './BoardTask.js';
import {BoardColumnHeader} from './BoardColumnHeader.js';
import {BoardAddTaskButton} from './BoardAddTaskButton.js';
import {Droppable} from 'react-beautiful-dnd';
import serverRequest from '../server-requests.js';
import './BoardColumn.css';


export const BoardColumn = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        try {
            const tasksData = await serverRequest.getTasksByColumn(props.id);
            setTasks(tasksData);
        }
        catch (e){
            console.log('board - ' + e.status);
            console.log('board - ' + e.message);
        }
    }, []);

    const columnBody = tasks.map((task, index) =>
        <BoardTask
            key={task.id}
            id={task.id}
            taskName={task.name}
            index={index}
        />
    );

    const addToDatabase = async (taskName) => {
        try {
            const newTask = await serverRequest.addTask({name: taskName}, props.id);
            setTasks(tasksData => tasksData.concat(newTask));
        }
        catch (e){
            console.log('board - ' + e.status);
            console.log('board - ' + e.message);
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
                addTask={addToDatabase}
            />
        </div>
    );
}