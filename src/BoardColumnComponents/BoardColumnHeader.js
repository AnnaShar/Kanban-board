import React, {useState, useEffect, useRef} from 'react';
import {ReactComponent as ReactLogo} from '../images/edit_icon.svg';

export const BoardColumnHeader = (props) => {
    const [editable, setEditable] = useState(false);
    const [focused, setFocus] = useState(false);
    const headerText = useRef(null);

    const handleEditClick = (e) => {
        setEditable(true);
        headerText.current.focus();
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setEditable(false);
        }
    }
    const handleBlur = (e) => {
        setEditable(false);
    }

    return (
        <>
            <div
                ref={headerText}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                contentEditable={editable}
                className="board-column__header">
                {props.name}
                <div className="board__edit-icon edit-icon">
                    {/*<ReactLogo*/}
                    {/*    onClick={handleEditClick}*/}
                    {/*/>*/}
                </div>
            </div>


        </>
    );
}