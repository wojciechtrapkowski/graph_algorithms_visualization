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
    let [dragMovement, setDragMovement] = useState([0, 0])
    const squareClasses ='w-6 h-6 border border-gray-300 m-0 flex justify-center';

    function onBoardClick(row : number, col : number) {
        if(props.board[row][col] == squareState.path) {
            const newBoard = props.board.slice();
            newBoard[row][col] = squareState.obstacle;
            props.setBoard(newBoard);
        }
    }

    function handleDragStart(e: React.DragEvent<HTMLDivElement>, x : number, y: number) {
        let newDragMovement = [x, y];
        setDragMovement(newDragMovement);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    };

    function handleDrop(e: React.DragEvent<HTMLDivElement>, x : number, y: number) {
        if(props.board[x][y] === squareState.path) {
            const newBoard = props.board.slice();
            newBoard[x][y] = newBoard[dragMovement[0]][dragMovement[1]];
            newBoard[dragMovement[0]][dragMovement[1]] = squareState.path;
            props.setBoard(newBoard);
        }
    }

    return (
        <div className="flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh', minHeight: '100vh'}}>
            <div className="flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh', minHeight: '100vh'}}>
                {props.board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cellValue, colIndex) => (
                    <div
                    key={(rowIndex+1)*(colIndex+1)}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, rowIndex, colIndex)}>
                        <button
                            key={(colIndex+1)*( rowIndex+1)}
                            className={squareClasses}
                            onClick={() => onBoardClick(rowIndex, colIndex)}
                            style={props.board[rowIndex][colIndex] === squareState.visitedPath ? { backgroundColor: 'green' } : props.board[rowIndex][colIndex] === squareState.foundDestination ? {backgroundColor: 'blue'} : {} }>
                            <Square fieldValue={cellValue} />
                        </button>
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );

}