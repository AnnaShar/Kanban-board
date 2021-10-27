import React, {useState, useRef, useEffect} from 'react';
import {ThemeContext, themes} from '../context-store/theme-context.js';
import './BoardHeader.css';
import {ReactComponent as ReactLogo} from '../images/edit_icon.svg';

export const BoardHeader = (props) => {
    const [editable, setEditable] = useState(false);
    const [focused, setFocus] = useState(false);
    const headerText = useRef(null);
    // const [theme, setTheme] = useState(null);

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
    // const changeTheme = () => {
    //     setTheme(themes.green);
    // }

    return (

        // <ThemeContext.Provider value={theme}>
        <div className="board__header">
            <div ref={headerText}
                 tabIndex={0}
                 onKeyDown={handleKeyDown}
                 onBlur={handleBlur}
                 contentEditable={editable}
                 className="board__name">{props.name}
            </div>

            <button onClick={props.changeTheme}>Change theme</button>
            <div className="board__edit-icon edit-icon">
                {/*<ReactLogo*/}
                {/*    onClick={handleEditClick}*/}
                {/*/>*/}
            </div>
        </div>
        // </ThemeContext.Provider>
    );
}