'use client';

import { useEffect, useState } from "react";
import { squareState } from "@/states/squareState";
import { Square } from "./square";
import { getRandomNumber } from "@/utilities/get_random_number";
import { getColor } from "@/utilities/get_color";

type BoardProps = {
    board: number[][],
    setBoard : React.Dispatch<React.SetStateAction<number[][]>>,
    isVisualizationRunning: boolean, 
    setIsVisualizationRunning: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Board = (props : BoardProps) => {
    let [dragMovement, setDragMovement] = useState([0, 0]);

    const squareClasses = 'w-6 h-6 border border-gray-300 m-0 flex justify-center';

    function onBoardClick(row : number, col : number) {
        if(props.isVisualizationRunning) {
            return;
        }
        if(props.board[row][col] == squareState.path) {
            const newBoard = props.board.slice();
            newBoard[row][col] = squareState.obstacle;
            props.setBoard([...newBoard]);
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
            props.setBoard([...newBoard]);
        }
    }

    return (
        <div className="mt-10 flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh'}}>
            <div className="flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                {props.board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cellValue, colIndex) => (
                    <div
                    key={(rowIndex+1)*(colIndex+1)}
                    draggable={!(props.isVisualizationRunning)}
                    onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e, rowIndex, colIndex)}>
                        <button
                            key={(colIndex+1)*( rowIndex+1)}
                            className={squareClasses}
                            onClick={() => onBoardClick(rowIndex, colIndex)}
                            style={{backgroundColor: getColor(props.board[rowIndex][colIndex])}}>
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