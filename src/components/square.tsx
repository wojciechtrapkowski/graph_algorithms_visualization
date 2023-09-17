'use client';

import { SquareState } from "@/states/square_state";
import { SquareType } from "@/types/square_type";
import { DestinationSVG } from "./icons/destination";
import { ObstacleSVG } from "./icons/obstacle";
import { SourceSVG } from "./icons/source";
import { WeightNodeSVG } from "./icons/weight_node";
import { SquareProps } from "./props/square_props";
import './css/square.css';

export const Square = (props : SquareProps) => {
  if (props.cell.state === SquareState.source) {
    return (
      <SourceSVG />
    );
  }
  else if (props.cell.state === SquareState.destination) {
    return (
      <DestinationSVG />
    );
  }
  else if (props.cell.state === SquareState.path) {
    return (<></>);
  } 
  else if (props.cell.state === SquareState.obstacle) {
    return (
      <ObstacleSVG />
    );
  }
  else if (props.cell.state === SquareState.weightNode) {
    return (
      <WeightNodeSVG />
    );
  }
  return(<></>);
}