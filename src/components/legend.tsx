import { SourceSVG } from "./icons/source"

import './css/legend.css';
import { DestinationSVG } from "./icons/destination";
import { ObstacleSVG } from "./icons/obstacle";
import { WeightNodeSVG } from "./icons/weight_node";

export const Legend = () => {
    return (
    <div className="legend">
        <div>
            <SourceSVG />
            <span>Start Node</span>
        </div>
        <div>
            <DestinationSVG />
            <span>Target Node</span>
        </div>
        <div>
            <ObstacleSVG />
            <span>Obstacle Node</span>
        </div>
        <div>
            <WeightNodeSVG />
            <span>Weight Node</span>
        </div>
    </div>
    );
} 