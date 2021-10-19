import React, {useState, useRef} from 'react';

export const BoardAddTaskButton = ({keyPressed}) => {
    const [taskName, setTaskName] = useState(null);

    const updateTaskName = ({target}) => {
        setTaskName(target.value);
    }

    return (<>
            <div
                className="board-column__item board-column__button-add">
                + Add task
            </div>
            <form className='add-task-form'>
                <input
                    onChange={updateTaskName}
                    className='add-task-form__input'
                    placeholder='Task name'
                    type='text'
                    onKeyPress={() => keyPressed(event, taskName)}
                />
            </form>
        </>
    );
}