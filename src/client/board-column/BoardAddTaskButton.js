import React, {useState} from 'react';
import './BoardAddTaskButton.css';

export const BoardAddTaskButton = ({addTask}) => {
    const [taskName, setTaskName] = useState('');

    const updateTaskName = ({target}) => {
        setTaskName(target.value);
    }

    const keyPressedHandle = async ({key}) => {
        if (key === 'Enter' && taskName) {
            await addTask(taskName);
            setTaskName('');
        }
    }

    return (<>
            <div
                className="board-column__item board-column__button-add">
                + Add task
            </div>

            <div className='add-task-form'>
                <input
                    className='add-task-form__input'
                    placeholder='Task name'
                    type='text'
                    value = {taskName}
                    onChange={updateTaskName}
                    onKeyPress={keyPressedHandle}
                />
            </div>
        </>
    );
}