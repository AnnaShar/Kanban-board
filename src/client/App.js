import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Board} from './board/Board.js';
import {ErrorPage} from './error/ErrorPage.js';

import './index.css';


function App() {
    return (
        <Switch>
            <Route exact path='/'>
                <Board/>
            </Route>
            <Route path='/error'>
                <ErrorPage/>
            </Route>

        </Switch>
    );
}

export default App;