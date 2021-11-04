import React, {useContext} from 'react';
import {BoardStoreContext} from "../context-store/board-store-context.js";
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import texts from '../constants/texts.js';


export const BoardAddColumnButton = () => {
    const {addColumn} = useContext(BoardStoreContext);
    const {language: [language, setLanguage]} = useContext(UserSettingsContext);

    return (
        <div className='board__board-column board__add-column-button'
             onClick={addColumn}
        > {texts.addColumnText[language.value]}
        </div>
    );
}