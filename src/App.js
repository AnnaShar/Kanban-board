import './index.css';
import boardColumnsData from "./board-data.js";
import {Board} from "./BoardComponents/Board.js";
import React from "react";

function App() {
    return (
        <Board
            name="My board"
            columns={boardColumnsData}
        />
    );
}

export default App;