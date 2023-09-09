'use client';
import { bfs } from "@/algorithms/bfs";
import { squareState } from "@/states/squareState";
import { useEffect, useState } from "react";
import { Board } from "./board";
import { Square } from "./square";
import { Navbar } from "./navbar";
import { resetBoardStates } from "@/utilities/reset_board_states";
import { dfs } from "@/algorithms/dfs";
import { dijkstra } from "@/algorithms/djikstra";

export default function MainApp() {
    // Constant values
    const numRows = 50;
    const numCols = 30;
    const pathRecreationDelay = 500;
    const foundDestinationDelay = 1000;
    const algorithms = ["BFS", "DFS", "Djikstra", "A*"];
    const [selectedAlgorithm, setAlgorithm] = useState("BFS");
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [isVisualizationRunning, setIsVisualizationRunning] = useState(false);

    const [board, setBoard] = useState( () => {
        const newBoard = Array.from({ length: numRows }, () =>
            Array.from({ length: numCols }, () => 0));
    
        newBoard[0][0] = squareState.source;
        newBoard[numRows-1][numCols-1] = squareState.destination;
                
        return newBoard;
    });

    const sourceX = board.findIndex(row => row.includes(squareState.source));
    const sourceY = sourceX >= 0 ? board[sourceX].indexOf(squareState.source) : -1;

    const algorithmsProps : algorithmsPropsType = {
        board: board, 
        setBoard: setBoard, 
        start: [sourceX, sourceY], 
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
            newBoard[0][0] = squareState.source;
            newBoard[numRows-1][numCols-1] = squareState.destination;
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
        }
    }

    function handleResetButtonClick() : void {
        setIsVisualizationRunning(false);
        resetBoard(true);
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
            algorithms={algorithms} 
            handleVisualizeClick={handleVisualizeClick} 
            handleResetButtonClick={handleResetButtonClick}
            />
            <Board 
            board={board} 
            setBoard={setBoard} 
            isVisualizationRunning={isVisualizationRunning} 
            setIsVisualizationRunning={setIsVisualizationRunning}
            />
        </>
);}