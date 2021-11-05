import React, {useContext, useRef, useState} from 'react';
import {BoardStoreContext} from '../context-store/board-store-context.js';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import { ToastContainer, toast } from 'react-toastify';
import texts from '../constants/texts.js';
import './BoardAddColumnButton.css';
import 'react-toastify/dist/ReactToastify.css';


export const BoardAddColumnButton = () => {
    const {addColumn} = useContext(BoardStoreContext);
    const {language: [language, setLanguage]} = useContext(UserSettingsContext);

    const columnAddInput = useRef(null);
    const [columnName, setColumnName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const updateColumnName = ({target}) => {
        setColumnName(target.value);
    };

    const keyPressedHandle = async ({key}) => {
        if (key === 'Enter' && columnName) {
            await addColumn(columnName);
            setColumnName('');
            setIsAdding(false);
        }
    }

    const handleCancel = () => {
        setIsAdding(false);
        setColumnName('');
    }
    const handleAddColumn = () => {
        if (columnName){
            addColumn(columnName);
            setColumnName('');
            setIsAdding(false);
        }
        else {
            toast.error('Enter name of the column', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:"colored"
            });
        }
    }

    return (
        <>
        <div
            className={'board-column board__add-column ' + (isAdding ? 'isAdding' : '')}
            onClick={addColumn}>
            {!isAdding &&
            <div
                className='board__add-column-button'
                onClick={() => setIsAdding(!isAdding)}>
                + {texts.addColumnText.button[language.value]}
            </div>}

            {isAdding &&
            <div
                className='add-column-form'>

                <input
                    tabIndex={0}
                    ref={columnAddInput}
                    className='add-column-form__input'
                    value={columnName}
                    placeholder={texts.addColumnText.placeholder[language.value]}
                    onChange={updateColumnName}
                    onKeyPress={keyPressedHandle}
                />

                <div className='add-column-form__button-area'>
                    <button
                        className='add-column-form__button button-save'
                        onClick={handleAddColumn}>
                        {texts.addColumnText.saveButton[language.value]}
                    </button>

                    <button
                        className='add-column-form__button button-cancel'
                        onClick={handleCancel}>
                        {texts.addColumnText.cancelButton[language.value]}
                    </button>
                </div>
            </div>}
        </div>
    <ToastContainer/>
    </>
    );
}