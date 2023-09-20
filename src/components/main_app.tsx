'use client';

import { SquareState } from "@/states/square_state";
import { useEffect, useState } from "react";
import { Board } from "./board";
import { Square } from "./square";
import { Navbar } from "./navbar";
import { resetBoardStates } from "@/utilities/reset_board_states";
import { dijkstra } from "@/algorithms/path_finding/dijkstra";
import { SquareType } from "@/types/square_type";
import { AlgorithmsPropsType } from "./props/algorithms_props";
import { AlgorithmDescription } from "./algorithm_description";
import { Legend } from "./legend";
import { bfs } from "@/algorithms/path_finding/bfs";
import { dfs } from "@/algorithms/path_finding/dfs";
import { aStar } from "@/algorithms/path_finding/a_star";
import { generateRandomMaze } from "@/algorithms/maze_generation/random";
import { generateRandomizedDFSMaze } from "@/algorithms/maze_generation/randomized_dfs";
import { generateRecursiveDivisionMaze } from "@/algorithms/maze_generation/recursive_divison";
import { greedyBestFirstSearch } from "@/algorithms/path_finding/greedy_best_first_search";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BarLoader } from "react-spinners";

export default function MainApp() {
    // Constant values

    const cellSize = 24;
    const navBarHeight = 136;
    const legendHeight = 164;

    const [numRows, setNumRows] = useState(Math.floor(window.innerWidth / cellSize) - 2);
    const [numCols, setNumCols] = useState(Math.floor((window.innerHeight - navBarHeight - legendHeight) / cellSize) - 2);

    // Add an event listener to check if user have changed window size
    useEffect(() =>  {
        // We don't have to check whether window object is undefined, because we render everything on client side
        window.addEventListener('resize', handleScreenSize);   
    }, []);

    useEffect(() => {
        setBoard([...createBoard()]);
    }, [numRows, numCols])

    const pathRecreationDelay = 500;
    const foundDestinationDelay = 1000;
    const weightedNodeWeight = 15;
    const pathfindingAlgorithms = ["BFS", "DFS", "Dijkstra", "A*", "Greedy Best-First Search"];
    const mazeGenerationAlgorithms = ["Random", "Randomized DFS", "Recursive Division"];
    const [selectedPathFindingAlgorithm, setSelectedPathFindingAlgorithm] = useState("BFS");
    const [selectedMazeGenerationAlgorithm, setSelectedMazeGenerationAlgorithm] = useState("Random");
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [isVisualizationRunning, setIsVisualizationRunning] = useState(false);
    const [isWeightNodePicked, setIsWeightNodePicked] = useState(false);

    const initialSquare: SquareType = {
        state: SquareState.path, 
        weight: 1,
        classes: [], 
      };

    const [board, setBoard] = useState(() => createBoard());
        
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
        weightedNodeWeight: weightedNodeWeight,
    };

    function handleScreenSize() {
        // Calculate the number of rows and columns based on the available space and cell size, substract 2 to have more space
        const newNumRows = Math.floor(window.innerWidth / cellSize) - 2;
        const newNumCols = Math.floor((window.innerHeight - navBarHeight - legendHeight) / cellSize) - 2;
        
        setNumRows(newNumRows);
        setNumCols(newNumCols);
    }

    function createBoard() : SquareType[][] {
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
    }

    function handleVisualizeClick() : void {
        if(isVisualizationRunning) {
            return;
        }
        const newBoard = [...board];
        resetBoardStates(newBoard);
        setBoard([...newBoard]);
        switch(selectedPathFindingAlgorithm) {
            case "BFS":
                bfs(algorithmsProps);
                return;
            case "DFS":
                dfs(algorithmsProps);
                return;
            case "Dijkstra":
                dijkstra(algorithmsProps);
                return;
            case "A*":
                aStar(algorithmsProps);
                return;
            case "Greedy Best-First Search":
                greedyBestFirstSearch(algorithmsProps);
                return;
        }
    }

    function handleGenerateMazeClick() : void {
        if(isVisualizationRunning) {
            return;
        }

        switch(selectedMazeGenerationAlgorithm) {
            case "Random":
                generateRandomMaze(algorithmsProps, isWeightNodePicked);
                return;
            case "Randomized DFS":
                generateRandomizedDFSMaze(algorithmsProps, isWeightNodePicked);
                return;
            case "Recursive Division":
                generateRecursiveDivisionMaze(algorithmsProps, isWeightNodePicked);
        }
    }


    function handleResetButtonClick() : void {
        setIsVisualizationRunning(false);
        const newBoard = [...board];
        resetBoardStates(newBoard, true);
        setBoard([...newBoard]);
    }

    function getIsWeightNodePicked() : boolean {
        return isWeightNodePicked;
    }

    return (
        <div>
            <Navbar 
                isVisualizationRunning={isVisualizationRunning}
                setIsVisualizationRunning={setIsVisualizationRunning}

                selectedPathFindingAlgorithm={selectedPathFindingAlgorithm} 
                setSelectedPathFindingAlgorithm={setSelectedPathFindingAlgorithm} 

                selectedMazeGenerationAlgorithm={selectedMazeGenerationAlgorithm} 
                setSelectedMazeGenerationAlgorithm={setSelectedMazeGenerationAlgorithm} 

                selectedSpeed={selectedSpeed} 
                setSelectedSpeed={setSelectedSpeed} 

                isWeightNodeClicked={isWeightNodePicked}
                updateWeightNodeClicked={() => setIsWeightNodePicked(!isWeightNodePicked)}

                pathfindingAlgorithms={pathfindingAlgorithms} 
                mazeGenerationAlgorithms={mazeGenerationAlgorithms}

                handleGenerateMazeClick={handleGenerateMazeClick}
                handleVisualizeClick={handleVisualizeClick} 
                handleResetButtonClick={handleResetButtonClick}
            />
            <AlgorithmDescription 
            algorithm={selectedPathFindingAlgorithm} />
            <Board 
                board={board} 
                setBoard={setBoard} 
                isVisualizationRunning={isVisualizationRunning} 
                setIsVisualizationRunning={setIsVisualizationRunning}
                getIsWeightNodePicked={getIsWeightNodePicked}
                weightedNodeWeight={weightedNodeWeight}
            />
            <Legend />
            <ToastContainer />
    </div>
        
);}