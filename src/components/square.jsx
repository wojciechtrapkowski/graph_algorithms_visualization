import { squareState } from "@/states/squareState";

export default function Square({fieldValue}) {
  if(fieldValue == squareState.path) {
    return (<></>);
  } else if (fieldValue == squareState.obstacle) {
    return (<>X</>)
  } else if (fieldValue == squareState.source) {
    return (<>S</>)
  } else if (fieldValue == squareState.destination) {
    return (<>D</>)
  }
}