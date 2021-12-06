import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ErrorPage} from './error/ErrorPage.js';
import {BoardProvider} from './board/BoardProvider.js';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={BoardProvider}>
            </Route>

            <Route path='/error' component={ErrorPage}>
            </Route>

        </Switch>
    );
}

export default App;