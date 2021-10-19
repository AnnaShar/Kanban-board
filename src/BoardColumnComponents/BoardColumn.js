import React, {useState, useEffect} from 'react';
import {BoardTask} from './BoardTask.js';
import {BoardColumnHeader} from './BoardColumnHeader.js';
import {BoardAddTaskButton} from './BoardAddTaskButton.js';
import serverRequest from '../server-requests.js';


export const BoardColumn = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(async () => {
        const tasksData = await serverRequest.getTasksByColumn(props.id);
        setTasks(tasksData);
    }, []);

    const columnBody = tasks.map(task =>
        <BoardTask
            key={task.id}
            task={task.name}
        />
    );

    const addToDatabase = (taskName) => {
        serverRequest.addTask({name:taskName},props.id);
    }

    const keyPressed = ({key}, taskName) => {
        if (key === 'Enter' && taskName) {
            addToDatabase(taskName);
        }
    }

    return (
        <div className='board__board-column board-column'>
            <BoardColumnHeader name={props.name}/>

            <div className='board_column__body'>
                {columnBody}
            </div>

            <BoardAddTaskButton
                keyPressed={keyPressed}
            />
        </div>
    );
}