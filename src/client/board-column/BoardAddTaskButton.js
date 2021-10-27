import React, {useState, useRef} from 'react';
import './BoardAddTaskButton.css';

export const BoardAddTaskButton = ({addTask}) => {
    const [taskName, setTaskName] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const addInput = useRef(null);

    const handleAddClick = () => {
        // if(!isAdding && addInput){
        //     addInput.current.focus();
        // }
        setIsAdding(!isAdding);
    };

    const updateTaskName = ({target}) => {
        setTaskName(target.value);
    };

    const keyPressedHandle = async ({key}) => {
        if (key === 'Enter' && taskName) {
            await addTask(taskName);
            setTaskName('');
            setIsAdding(false);
        }
    }

    return (<>
            <div
                className="board-column__item board-column__button-add"
                onClick={handleAddClick}>
                + Add task
            </div>

            {isAdding &&
            <div className='add-task-form'>
                <input
                    ref = {addInput}
                    className='add-task-form__input'
                    placeholder='Task name'
                    type='text'
                    value={taskName}
                    onChange={updateTaskName}
                    onKeyPress={keyPressedHandle}
                />
            </div>}
        </>
    );
}