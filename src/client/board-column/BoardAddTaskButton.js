import React, {useState, useRef, useContext} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import texts from '../constants/texts.js';
import './BoardAddTaskButton.css';


export const BoardAddTaskButton = ({columnID}) => {
    const [taskName, setTaskName] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const {addTask} = useContext(BoardStoreContext);
    const {language} = useContext(UserSettingsContext);

    const handleAddClick = () => {
        setIsAdding(!isAdding);
    };

    const updateTaskName = ({target}) => {
        setTaskName(target.value);
    };

    const keyPressedHandle = async ({key}) => {
        if (key === 'Enter' && taskName) {
            addTask({name: taskName}, columnID);
            setTaskName('');
            setIsAdding(false);
        }
    }

    return (<>
            <div
                className='board-column__item board-column__button-add'
                onClick={handleAddClick}>
                + {texts.addTask.button[language.value]}
            </div>

            {isAdding &&
            <div className='add-task-form'>
                <input
                    autoFocus
                    className='add-task-form__input'
                    placeholder={texts.addTask.placeholder[language.value]}
                    type='text'
                    value={taskName}
                    onChange={updateTaskName}
                    onKeyPress={keyPressedHandle}
                />
            </div>}
        </>
    );
}