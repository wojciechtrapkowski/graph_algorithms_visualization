'use client';

import { useState } from "react";
import Square from "./square";
import * as _l from 'lodash';
import { squareState } from "@/states/squareState";

export default function Board() {
    const numRows = 8;
    const numCols = 8;

    const [board, setBoard] = useState(() => {
        const newBoard = Array.from({ length: numRows }, () =>
            Array.from({ length: numCols }, () => 0)
        );

        // Set source randomly
        const sourceRow = _l.random(0, numRows);
        const sourceCol = _l.random(0, numCols);

        // Set destination randomly
        let destinationRow = _l.random(0, numRows);
        let destinationCol = _l.random(0, numCols);

        while(newBoard[destinationRow][destinationCol] != squareState.path) {
            destinationRow = _l.random(0, numRows);
            destinationCol = _l.random(0, numCols);    
        }

        newBoard[sourceRow][sourceCol] = squareState.source;
        newBoard[destinationRow][destinationCol] = squareState.destination;

        return newBoard;
    });

    const squareClasses ='w-6 h-6 border border-gray-300 m-0 flex justify-center';

    function onBoardClick(row, col) {
        const newBoard = board.slice();
        newBoard[row][col] = squareState.obstacle;
        setBoard(newBoard);
    }

    return (
        <div className="flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh', minHeight: '100vh'}}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} >
                    {row.map((_, colIndex) => (
                        <button key={(rowIndex+1)*(colIndex+1)} className={squareClasses} onClick={() => onBoardClick(rowIndex, colIndex)}>
                            <Square key={(rowIndex+1)*(colIndex+1)} fieldValue={board[rowIndex][colIndex]}/>
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );

}