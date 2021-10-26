import React from 'react';
import {Board} from './board/Board.js';
import boardController from './board-api-controller.js';

import './index.css';


function App() {
    // return (boardController.createBoard());
    return (<Board/>);
}

export default App;