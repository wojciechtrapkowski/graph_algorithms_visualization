'use client';

import { squareState } from "@/states/squareState";

type SquareProps = {
  fieldValue : number;
}

export const Square = (props : SquareProps) => {
  if(props.fieldValue == squareState.path) {
    return (<></>);
  } else if (props.fieldValue == squareState.obstacle) {
    return (<>X</>);
  }
  else if (props.fieldValue == squareState.source) {
    return (<>S</>);
  }
  else if (props.fieldValue == squareState.destination) {
    return (<>D</>)
  }
  return(<></>);
}