import React, {useContext} from 'react';
import {TextToAdd} from '../service-components/TextToAdd.js';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import texts from '../constants/texts.js';

import './BoardAddColumnButton.css';


export const BoardAddColumnButton = () => {
    const {addColumn} = useContext(BoardStoreContext);

    return (
        <TextToAdd
            saveItem={addColumn}
            itemTexts={texts.addColumn}
            showError={true}
            type='column'
            classNames='board-column'
        />
    );
}