'use client';

import { SourceSVG } from "./icons/source"

import './css/legend.css';
import { DestinationSVG } from "./icons/destination";
import { ObstacleSVG } from "./icons/obstacle";
import { WeightNodeSVG } from "./icons/weight_node";

export const Legend = () => {
    return (
    <div className="w-full mt-8 flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 legend">
        <div className="flex items-center">
            <SourceSVG />
            <span>Start Node</span>
        </div>
        <div className="flex items-center">
            <DestinationSVG />
            <span>Target Node</span>
        </div>
        <div className="flex items-center">
            <ObstacleSVG />
            <span>Obstacle Node</span>
        </div>
        <div className="flex items-center">
            <WeightNodeSVG/>
            <span>Weight Node</span>
        </div>
    </div>
    );
} 