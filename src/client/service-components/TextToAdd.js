import React, {useContext, useRef, useState} from 'react';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import {showErrorMessage} from '../utils/notifier.js';
import {ToastContainer} from 'react-toastify';
import useOnClickOutside from 'use-onclickoutside';

import './TextToAdd.css';
import 'react-toastify/dist/ReactToastify.css';


export const TextToAdd = ({saveItem, itemTexts, showError = false, type}) => {
    const {language, theme} = useContext(UserSettingsContext);

    const [text, setText] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const closingRef = useRef();
    useOnClickOutside(closingRef, () => setIsAdding(false));

    const updateText = ({target}) => {
        setText(target.value);
    };

    const keyPressedHandle = async ({key}) => {
        if (key === 'Enter' && text) {
            handleAdding();
        }
    }

    const handleAdding = () => {
        if (text) {
            saveItem(text);
            setText('');
            setIsAdding(false);
        } else if (showError) {
            showErrorMessage(itemTexts.error[language.value]);
        }
    }

    const handleCancel = () => {
        setIsAdding(false);
        setText('');
    }

    return (
        <>
            <div
                className={`add-item-container add-${type}-container  ${isAdding ? 'isAdding' : ''}`}>

                {!isAdding ? (
                        <div
                            className={`add-item-button add-${type}-button`}
                            onClick={() => setIsAdding(!isAdding)}>
                            + {itemTexts.button[language.value]}
                        </div>)

                    : (<div
                        ref={closingRef}
                        className={`add-item-form add-${type}-form`}>

                        <input
                            autoFocus
                            className={`add-item-form__input add-${type}-form__input`}
                            value={text}
                            placeholder={itemTexts.placeholder[language.value]}
                            onChange={updateText}
                            onKeyPress={keyPressedHandle}
                        />

                        <div className={`add-item-form__button-area`}>
                            <button
                                className={`add-item-form__button button-save`}
                                onClick={handleAdding}
                                style={{backgroundColor: theme.base}}>
                                {itemTexts.saveButton[language.value]}
                            </button>

                            <button
                                className={`add-item-form__button button-cancel`}
                                onClick={handleCancel}
                                style={{color: theme.base}}>
                                {itemTexts.cancelButton[language.value]}
                            </button>
                        </div>
                    </div>)}
            < /div>

            <ToastContainer/>
        </>
    );
}


