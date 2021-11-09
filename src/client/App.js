import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Board} from './board/Board.js';
import {ErrorPage} from './error/ErrorPage.js';
import BoardProvider from './context-store/user-settings-context.js';
import BoardDataProvider from './context-store/board-store-context.js';

import './index.css';


function App() {
    return (
        <Switch>
            <Route exact path='/'>
                <BoardProvider>
                    <BoardDataProvider>
                        <Board/>
                    </BoardDataProvider>
                </BoardProvider>
            </Route>
            <Route path='/error'>
                <ErrorPage/>
            </Route>

        </Switch>
    );
}

export default App;