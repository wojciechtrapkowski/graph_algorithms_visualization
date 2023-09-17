'use client';
import { bfs } from "@/algorithms/bfs";
import { SquareState } from "@/states/square_state";
import { useEffect, useState } from "react";
import { Board } from "./board";
import { Square } from "./square";
import { Navbar } from "./navbar";
import { resetBoardStates } from "@/utilities/reset_board_states";
import { dfs } from "@/algorithms/dfs";
import { dijkstra } from "@/algorithms/djikstra";
import { aStar } from "@/algorithms/a_star";
import { SquareType } from "@/types/square_type";
import { AlgorithmsPropsType } from "./props/algorithms_props";

export default function MainApp() {
    // Constant values
    const numRows = 30;
    const numCols = 15;
    const pathRecreationDelay = 500;
    const foundDestinationDelay = 1000;
    const weightedNodeWeight = 15;
    const algorithms = ["BFS", "DFS", "Djikstra", "A*"];
    const [selectedAlgorithm, setAlgorithm] = useState("BFS");
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [isVisualizationRunning, setIsVisualizationRunning] = useState(false);
    const [isWeightNodePicked, setIsWeightNodePicked] = useState(false);

    const initialSquare: SquareType = {
        state: SquareState.path, 
        weight: 1,
        classes: [], 
      };

      const [board, setBoard] = useState(() => {
        const newBoard = Array.from({ length: numRows }, () =>
          Array.from({ length: numCols }, () => ({ ...initialSquare }))
        );
      
        // Create a copy of the board and set the source and destination squares
        const updatedBoard = [...newBoard];
        updatedBoard[0][0].state = SquareState.source;
      
        // Create a new classes array for the destination square
        updatedBoard[numRows - 1][numCols - 1].state = SquareState.destination;
        updatedBoard[numRows - 1][numCols - 1].classes = ["destination"];
      
        return updatedBoard;
      });
      
      
        
    let sourceX = -1, sourceY = -1, destinationX = -1, destinationY = -1;

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y].state === SquareState.source) {
                sourceX = x;
                sourceY = y;
            }
            if (board[x][y].state === SquareState.destination) {
                destinationX = x;
                destinationY = y;
            }
        }
    }

    const algorithmsProps : AlgorithmsPropsType = {
        board: board, 
        setBoard: setBoard, 
        start: [sourceX, sourceY],
        destination: [destinationX, destinationY],
        delay: selectedSpeed,
        foundDestinationDelay: foundDestinationDelay,
        pathRecreationDelay: pathRecreationDelay,
        isVisualizationRunning: isVisualizationRunning, 
        setIsVisualizationRunning: setIsVisualizationRunning,
    };

    function resetBoard(fullReset?: boolean) {
        const newBoard = board.slice();

        resetBoardStates(newBoard, fullReset);

        if(fullReset) {
            newBoard[0][0].state = SquareState.source;
            newBoard[numRows-1][numCols-1].state = SquareState.destination;
            newBoard[numRows-1][numCols-1].classes = ["destination"];
        }

        setBoard([...newBoard])
    }

    function handleVisualizeClick() : void {
        if(isVisualizationRunning) {
            return;
        }
        resetBoard();
        switch(selectedAlgorithm) {
            case "BFS":
                bfs(algorithmsProps);
                return;
            case "DFS":
                dfs(algorithmsProps);
                return;
            case "Djikstra":
                dijkstra(algorithmsProps);
                return;
            case "A*":
                aStar(algorithmsProps);
                return;
        }
    }

    function handleResetButtonClick() : void {
        setIsVisualizationRunning(false);
        resetBoard(true);
    }

    function getIsWeightNodePicked() : boolean {
        return isWeightNodePicked;
    }

    return (
        <>
            <Navbar 
                isVisualizationRunning={isVisualizationRunning}
                setIsVisualizationRunning={setIsVisualizationRunning}
                selectedAlgorithm={selectedAlgorithm} 
                setSelectedAlgorithm={setAlgorithm} 
                selectedSpeed={selectedSpeed} 
                setSelectedSpeed={setSelectedSpeed} 
                isWeightNodeClicked={isWeightNodePicked}
                updateWeightNodeClicked={() => setIsWeightNodePicked(!isWeightNodePicked)}
                algorithms={algorithms} 
                handleVisualizeClick={handleVisualizeClick} 
                handleResetButtonClick={handleResetButtonClick}
            />
            <Board 
                board={board} 
                setBoard={setBoard} 
                isVisualizationRunning={isVisualizationRunning} 
                setIsVisualizationRunning={setIsVisualizationRunning}
                getIsWeightNodePicked={getIsWeightNodePicked}
                weightedNodeWeight={weightedNodeWeight}
            />
        </>
);}