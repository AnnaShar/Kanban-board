import React, {useState, useContext} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import EditIcon from '../images/edit-icon-18.svg';

import './EditableTextArea.css';


export const EditableTextArea = (props) => {
    const {theme} = useContext(UserSettingsContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [text, setText] = useState(props.text);
    const [previousText, setPreviousText] = useState(props.text);
    const [hover, setHover] = useState(false);

    const handleEditClick = () => {
        setIsEdit(true);
    };

    const updateColumnName = ({target}) => {
        setText(target.value);
        target.value ? setIsInputEmpty(false) : setIsInputEmpty(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!isInputEmpty) {
                setIsEdit(false);
                changeText();
            } else {
                setIsEdit(false);
                setText(previousText);
                setIsInputEmpty(false);
            }
        }
    };

    const handleBlur = () => {
        if (!isInputEmpty) {
            setIsEdit(false);
            changeText();
        } else {
            setIsEdit(false);
            setText(previousText);
            setIsInputEmpty(false);
        }
    };

    const changeText = () => {
        props.saveChanges(text);
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
                className={`editable-textarea__text ${props.className}__text`}>
                {text}

                <div className='edit-task-button'
                     onClick={handleEditClick}
                     style={buttonStyle({hover})}
                     onMouseEnter={() => setHover(true)}
                     onMouseLeave={() => setHover(false)}>
                    <EditIcon
                        style={svgStyle({hover})}/>
                </div>
            </div>}

            {isEdit &&
            <textarea
                autoFocus
                className={`editable-textarea__textarea ${props.className}__textarea ${isInputEmpty ? 'error-input' : ''}`}
                style={{borderColor: theme.base}}
                value={text}
                onChange={updateColumnName}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
            }
        </>
    )
}