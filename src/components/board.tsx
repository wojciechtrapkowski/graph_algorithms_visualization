'use client';

import { useEffect, useState } from "react";
import { squareState } from "@/states/squareState";
import { Square } from "./square";
import { getRandomNumber } from "@/utilities/random_number";

type BoardProps = {
    board: number[][],
    setBoard : React.Dispatch<React.SetStateAction<number[][]>>,
    numRows : number,
    numCols : number,
}

export const Board = (props : BoardProps) => {
    
    const squareClasses ='w-6 h-6 border border-gray-300 m-0 flex justify-center';

    function onBoardClick(row : number, col : number) {
        const newBoard = props.board.slice();
        newBoard[row][col] = squareState.obstacle;
        props.setBoard(newBoard);
    }

    return (
        <div className="flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh', minHeight: '100vh'}}>
            <div className="flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh', minHeight: '100vh'}}>
                {props.board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cellValue, colIndex) => (
                    <button
                        key={colIndex}
                        className={squareClasses}
                        onClick={() => onBoardClick(rowIndex, colIndex)}
                        style={props.board[rowIndex][colIndex] === squareState.visitedPath ? { backgroundColor: 'green' } : props.board[rowIndex][colIndex] === squareState.foundDestination ? {backgroundColor: 'blue'} : {} }>
                        <Square fieldValue={cellValue} />
                    </button>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );

}