import React, {useState, useContext} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {Keys} from '../constants/constants.js';
import EditIcon from '../images/edit-icon-18.svg';

import './EditableText.css';


export const EditableText = ({value, saveChanges, editButton = false, className, multipleRows=false}) => {
    const {theme} = useContext(UserSettingsContext);
    const [isEdit, setIsEdit] = useState(false);
    const [hasErrors, setHasErrors] = useState(false);
    const [text, setText] = useState(value);
    const [previousText, setPreviousText] = useState(value);
    const [hover, setHover] = useState(false);

    const handleEditClick = () => {
        setIsEdit(true);
    };

    const updateText = ({target}) => {
        setText(target.value);
        setHasErrors(target.value==='');
    };

    const handleKeyDown = (e) => {
        if (e.key === Keys.Enter) {
            setIsEdit(false);

            if (!hasErrors) {
                saveText();
            } else {
                setText(previousText);
                setHasErrors(false);
            }
        }
    };

    const handleBlur = () => {
        setIsEdit(false);

        if (!hasErrors) {
            saveText();
        } else {
            setText(previousText);
            setHasErrors(false);
        }
    };

    const handleFocus = (e) => {
        const temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }

    const saveText = () => {
        saveChanges(text);
        setPreviousText(text);
    }

    const buttonStyle = ({hover}) => ({
        background: hover ? theme.base : theme.light
    })

    const svgStyle = ({hover}) => ({
        fill: hover ? '#ffffff' : '#626161'
    })

    return (<>
            {!isEdit &&
            <div
                onClick={!editButton ? handleEditClick : (e) => e.preventDefault()}
                className={`editable-text__text ${className}__text`}>
                {text}

                {editButton &&
                <div className='edit-task-button'
                     onClick={handleEditClick}
                     style={buttonStyle({hover})}
                     onMouseEnter={() => setHover(true)}
                     onMouseLeave={() => setHover(false)}>
                    <EditIcon
                        style={svgStyle({hover})}/>
                </div>
                }
            </div>}

            {isEdit && (multipleRows ?
                    <textarea
                        autoFocus
                        className={`editable-text__textarea editable-${className}__textarea ${hasErrors ? 'error-input' : ''}`}
                        style={{borderColor: theme.base}}
                        value={text}
                        onChange={updateText}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />
                    :
                    <input
                        autoFocus
                        className={`editable-text__input editable-${className}__input ${hasErrors ? 'error-input' : ''}`}
                        type='text'
                        style={{borderColor: theme.base}}
                        value={text}
                        onChange={updateText}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                    />
            )
            }
        </>
    )
}