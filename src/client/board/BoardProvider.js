import React from 'react';
import UserSettingsProvider from '../context-store/user-settings-context.js';
import BoardDataProvider from '../context-store/board-store-context.js';
import TrashCanStateProvider from '../context-store/trash-can-context.js';


export const BoardProvider = ({children}) => {
    return (
        <UserSettingsProvider>
            <BoardDataProvider>
                <TrashCanStateProvider>
                    {children}
                </TrashCanStateProvider>
            </BoardDataProvider>
        </UserSettingsProvider>
    )
}

