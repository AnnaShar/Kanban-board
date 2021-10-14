import {BoardTask} from "./BoardTask.js";
import {BoardColumnHeader} from "./BoardColumnHeader.js";
import {BoardAddTaskButton} from "./BoardAddTaskButton.js";
import React, {useState, useEffect, useRef} from 'react';

export const BoardColumn = (props) => {
    const inputTaskName = useRef(null);
    const columnTasks = props.tasks.map(task =>
        <BoardTask
            key={task.id}
            task={task.description}
        />
    );

    const [newTasks, setNewTasks] = useState([])
    const [newTaskName, setNewTaskName] = useState("")
    const Search = ({query}) => <li>{query}</li>

    const handleClick = () => {
        if (newTaskName.length > 0) {
            setNewTasks(searches => searches.concat(newTaskName));
            
            inputTaskName.current.value = '';
            setNewTaskName('');
        }
    }
    const updateQuery = ({target}) => {
        setNewTaskName(target.value);
    }

    const keyPressed = ({key}) => {
        if (key === "Enter") {
            handleClick()
        }
    }

    const submitHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
    }

    return (
        <div className="board__board-column board-column">
            <BoardColumnHeader name={props.name}/>

            <div className="board_column__body">
                {columnTasks}

                {newTasks && newTasks.map((name, i) => (
                    <BoardTask
                        key={name + i}
                        task={name}
                    />
                ))}
            </div>

            <BoardAddTaskButton
                onClick={handleClick}
            />
            <form className="add-task-form" onSubmit={submitHandler}>
                <input
                    ref={inputTaskName}
                    className="add-task-form__input"
                    placeholder="Task name"
                    type="text"
                    onChange={updateQuery}
                    onKeyPress={keyPressed}
                />
            </form>
        </div>
    );
}