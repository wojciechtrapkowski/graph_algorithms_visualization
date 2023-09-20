'use client';

import { useEffect, useState } from "react";
import { SquareState } from "@/states/square_state";
import { Square } from "./square";
import { BoardProps } from "./props/board_props";
import { resetBoardStates } from "@/utilities/reset_board_states";

export const Board = (props : BoardProps) => {
    let [dragMovement, setDragMovement] = useState([0, 0]);
    const [hasClicked, setHasClicked] = useState(false);

    const squareClasses = 'w-6 h-6 border border-gray-300 m-0 flex justify-center';

    function onBoardClick(row : number, col : number) : void {
        if(props.isVisualizationRunning) {
            return;
        }
        if(props.board[row][col].state === SquareState.source) {
            return;
        }
        if(props.board[row][col].state === SquareState.destination) {
            return;
        }

        resetBoardStates(props.board);

        const newBoard = [...props.board]; 

        if(props.board[row][col].state !== SquareState.path)  {
            newBoard[row][col] = {
                ...newBoard[row][col],
                state: SquareState.path,
                weight: 1,
            };
            props.setBoard([...newBoard]);
            return;
        }

        newBoard[row][col] = {
            ...newBoard[row][col],
            state: props.getIsWeightNodePicked() ? SquareState.weightNode : SquareState.obstacle,
            weight: props.getIsWeightNodePicked() ? props.weightedNodeWeight : 99
        };

        props.setBoard([...newBoard]);

    }

    function validateElementToDrag(rowIndex: number, colIndex : number) : boolean {
        if(props.board[rowIndex][colIndex].state === SquareState.source) {
            return true;
        }
        if(props.board[rowIndex][colIndex].state === SquareState.destination) {
            return true;
        }
        return false;
    }

    function handleDragStart(e: React.DragEvent<HTMLDivElement>, x : number, y: number): void {
        let newDragMovement = [x, y];
        setDragMovement(newDragMovement);
        setHasClicked(false);
        resetBoardStates(props.board);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) : void{
        e.preventDefault();
        setHasClicked(false);
    };

    function handleDrop(e: React.DragEvent<HTMLDivElement>, x : number, y: number) : void {
        if(props.board[x][y].state !== SquareState.path) {
            return;
        }

        const newBoard = props.board.map((row) =>
            row.map((square) => ({ ...square }))
        );
      
        newBoard[x][y] = { ...newBoard[dragMovement[0]][dragMovement[1]] };
        newBoard[dragMovement[0]][dragMovement[1]].state = SquareState.path;
        newBoard[dragMovement[0]][dragMovement[1]].classes = [];
      
        props.setBoard([...newBoard]);
    }

    function handleMouseOver(rowIndex: number, colIndex: number) : void {
        if(props.isVisualizationRunning) {
            return;
        }
        if(!hasClicked) {
            return;
        }
        if(props.board[rowIndex][colIndex].state === SquareState.source) {
            return;
        }
        if(props.board[rowIndex][colIndex].state === SquareState.destination) {
            return;
        }
        if(props.board[rowIndex][colIndex].state === SquareState.obstacle) {
            return;
        }
        if(props.board[rowIndex][colIndex].state === SquareState.weightNode) {
            return;
        }

        const newBoard = [...props.board]; 
        newBoard[rowIndex][colIndex] = {
            ...newBoard[rowIndex][colIndex],
            state: props.getIsWeightNodePicked() ? SquareState.weightNode : SquareState.obstacle,
            weight: props.getIsWeightNodePicked() ? props.weightedNodeWeight : 99
        };

        props.setBoard([...newBoard]);
    }

    return (
        <div className="mt-10 flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh'}}
            onMouseDown={() => setHasClicked(true)}
            onMouseUp={() => setHasClicked(false)}
            onMouseLeave={() => setHasClicked(false)}>
            <div className="flex justify-center items-center flex-wrap" style={{maxWidth: '100vw', maxHeight: '100vh'}}>
                {props.board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cellValue, colIndex) => (
                    <div
                        key={(rowIndex+1)*(colIndex+1)}
                        draggable={(!(props.isVisualizationRunning) && validateElementToDrag(rowIndex, colIndex))}
                        onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                        onMouseEnter={() => handleMouseOver(rowIndex, colIndex)}>
                            <button
                                key={(colIndex+1)*( rowIndex+1)}
                                className={`${squareClasses} ${props.board[rowIndex][colIndex].classes.join(' ')}`}
                                onClick={() => onBoardClick(rowIndex, colIndex)}
                                >
                                <Square cell={cellValue} />
                            </button>
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
}