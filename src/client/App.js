import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {ErrorPage} from './error/ErrorPage.js';
import {BoardContainer} from './board/BoardContainer.js';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={BoardContainer}/>

            <Route path='/error' component={ErrorPage}/>
        </Switch>
    );
}

export default App;