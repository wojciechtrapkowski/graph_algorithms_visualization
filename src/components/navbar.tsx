import React, { useState } from "react";
import { NavbarProps } from "./props/navbar_props";

export const Navbar = (props: NavbarProps) => {
    const maxSpeedValue = 1000;

    const handlePathFindingAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setSelectedPathFindingAlgorithm(event.target.value);
    };
    const handleMazeGenerationAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setSelectedMazeGenerationAlgorithm(event.target.value);
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSelectedSpeed(Math.abs(maxSpeedValue - parseInt(event.target.value, 10)));
    };

    return (
        <nav className="bg-neutral-700 p-4 w-full">
            <div className="container flex items-center justify-between max-w-full">
            <div className="text-white ml-4">
                <h1 className="text-xl font-semibold">Pathfinding Algorithms Visualization</h1>
            </div>
            <div className="sm:ml-8 ml-auto max-w-full overflow-x-auto p-4">
                <div className="flex space-x-4 items-center">
                    <div className="ml-2 mr-2 flex items-center">
                        <label htmlFor="speed" className="text-white mr-2">
                            Set Speed:
                        </label>
                        <input
                            disabled={props.isVisualizationRunning}
                            id="speed"
                            type="range"
                            min="0"
                            max={maxSpeedValue}
                            className="bg-white text-gray-800 p-2 rounded-md"
                            value={maxSpeedValue-props.selectedSpeed}
                            onChange={handleSpeedChange}
                        />
                        </div>
                    <button
                        disabled={props.isVisualizationRunning}
                        className="ml-2 mr-2 text-white px-4 py-2 rounded-md"
                        style={props.isWeightNodeClicked ? {color: '#1E90FF'} : {}}
                        onClick={props.updateWeightNodeClicked}
                    > Weight node
                    </button>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <label htmlFor="algorithm" className="text-white">
                            Maze Generation Algorithm:
                        </label>
                        <select
                            disabled={props.isVisualizationRunning}
                            id="algorithm"
                            className="bg-white text-gray-800 p-2 rounded-md"
                            value={props.selectedMazeGenerationAlgorithm}
                            onChange={handleMazeGenerationAlgorithmChange}
                        >
                            {props.mazeGenerationAlgorithms.map((algorithm) => (
                                <option key={algorithm} value={algorithm}>
                                    {algorithm}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        disabled={props.isVisualizationRunning}
                        className="ml-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={props.handleGenerateMazeClick}
                        style={props.isVisualizationRunning ? { backgroundColor: 'rgb(197, 197, 197)', color: '#4d4d4d'} : {}}
                    >
                        Generate
                    </button>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <label htmlFor="algorithm" className="text-white">
                            Pathfinding Algorithm:
                        </label>
                        <select
                            disabled={props.isVisualizationRunning}
                            id="algorithm"
                            className="ml-3 bg-white text-gray-800 p-2 rounded-md"
                            value={props.selectedPathFindingAlgorithm}
                            onChange={handlePathFindingAlgorithmChange}
                        >
                            {props.pathfindingAlgorithms.map((algorithm) => (
                                <option key={algorithm} value={algorithm}>
                                    {algorithm}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        disabled={props.isVisualizationRunning}
                        className="ml-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={props.handleVisualizeClick}
                        style={props.isVisualizationRunning ? { backgroundColor: 'rgb(197, 197, 197)', color: '#4d4d4d'} : {}}
                    >
                        Visualize
                    </button>
                    <button
                        disabled={props.isVisualizationRunning}
                        className="ml-2 mr-2 text-white px-4 py-2 rounded-md"
                        onClick={props.handleResetButtonClick}
                    > Reset board
                    </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};