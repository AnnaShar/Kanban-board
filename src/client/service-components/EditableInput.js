import React, {useState, useContext} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import './EditableInput.css';

export const EditableInput = (props) => {
    const {theme} = useContext(UserSettingsContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [text, setText] = useState(props.text);
    const [previousText, setPreviousText] = useState(props.text);

    const handleEditClick = () => {
        setIsEdit(true);
    };

    const updateColumnName = ({target}) => {
        setText(target.value);
        target.value ? setIsInputEmpty(false) : setIsInputEmpty(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !isInputEmpty) {
            setIsEdit(false);
            changeColumnName();
        }
    };

    const handleBlur = () => {
        if (!isInputEmpty) {
            setIsEdit(false);
            changeColumnName();
        }
        else{
            setIsEdit(false);
            setText(previousText);
            setIsInputEmpty(false);
        }
    };

    const changeColumnName = () => {
        props.saveChanges(text);
        setPreviousText(text);
    }

    return (<>
            {!isEdit &&
            <div
                onClick={handleEditClick}
                className={`editable-text__text ${props.className}__text`}>
                {text}
            </div>}

            {isEdit &&
            <input
                autoFocus
                className={`editable-text__input ${props.className}__input ${isInputEmpty ? 'error-input' : ''}`}
                type='text'
                style={{borderColor:theme.base}}
                value={text}
                onChange={updateColumnName}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
            }
        </>
    )
}