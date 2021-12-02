import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Board} from './board/Board.js';
import {ErrorPage} from './error/ErrorPage.js';
import {BoardProvider} from './board/BoardProvider.js';

const App = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <BoardProvider>
                    <Board/>
                </BoardProvider>
            </Route>
            <Route path='/error'>
                <ErrorPage/>
            </Route>

        </Switch>
    );
}

export default App;