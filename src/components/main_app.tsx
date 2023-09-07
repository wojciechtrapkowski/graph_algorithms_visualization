'use client';
import { bfs } from "@/algorithms/bfs";
import { squareState } from "@/states/squareState";
import { useState } from "react";
import { Board } from "./board";
import { Square } from "./square";
import { Navbar } from "./navbar";
import { resetBoard } from "@/utilities/reset_board";

export default function MainApp() {
    // Constant values
    const numRows = 70;
    const numCols = 30;
    const pathRecreationDelay = 500;
    const algorithms = ["BFS", "DFS", "A*"];
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
    
    const algorithmsPropsType : algorithmsPropsType = {
        board: board, 
        start: [sourceX, sourceY], 
        delay: selectedSpeed,
        pathRecreationDelay: pathRecreationDelay,
        isVisualizationRunning: isVisualizationRunning, 
        setBoard: setBoard, 
        setIsVisualizationRunning: setIsVisualizationRunning
    };

    function handleVisualizeClick() : void {
        if(isVisualizationRunning) {
            return;
        }
        const newBoard = board.slice();
        resetBoard(newBoard);
        setBoard([...newBoard])
        switch(selectedAlgorithm) {
            case "BFS":
                bfs(algorithmsPropsType);
                return;
        }
    }
    return (
        <>
            <Navbar 
            isVisualizationRunning={isVisualizationRunning}
            selectedAlgorithm={selectedAlgorithm} 
            setSelectedAlgorithm={setAlgorithm} 
            selectedSpeed={selectedSpeed} 
            setSelectedSpeed={setSelectedSpeed} 
            algorithms={algorithms} 
            handleVisualizeClick={handleVisualizeClick} 
            />
            <Board 
            board={board} 
            setBoard={setBoard} 
            isVisualizationRunning={isVisualizationRunning} 
            setIsVisualizationRunning={setIsVisualizationRunning}
            />
        </>
);}