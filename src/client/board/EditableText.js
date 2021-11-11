import React, {useState} from 'react';

export const EditableText = (props) => {
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
                value={text}
                onChange={updateColumnName}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
            />
            }
        </>
    )
}