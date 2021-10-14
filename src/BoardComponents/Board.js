import React from "react";
import {BoardHeader} from "./BoardHeader.js";
import {BoardBody} from "./BoardBody.js";

export const Board = (props) => {
    return(
        <div className="board">
            <BoardHeader name={props.name}/>
            <BoardBody columns = {props.columns}/>
        </div>
    );
}