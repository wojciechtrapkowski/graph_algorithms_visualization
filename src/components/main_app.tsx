'use client';
import { bfs } from "@/algorithms/bfs";
import { squareState } from "@/states/squareState";
import { useState } from "react";
import { Board } from "./board";
import { Square } from "./square";

export default function MainApp() {
    const numRows = 8;
    const numCols = 8;

    const [board, setBoard] = useState( () => {
        const newBoard = Array.from({ length: numRows }, () =>
            Array.from({ length: numCols }, () => 0));
    
        newBoard[0][0] = squareState.source;
        newBoard[numRows-1][numCols-1] = squareState.destination;
                
        return newBoard;
    });

    return (
        <>
            <button onClick={() => bfs(board, setBoard, numRows, numCols, [0,0], 100)}>Run BFS</button>
            <Board board={board} setBoard={setBoard} numRows={numRows} numCols={numCols}/>
        </>
);}