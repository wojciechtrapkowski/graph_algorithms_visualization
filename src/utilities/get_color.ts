import { squareState } from "@/states/squareState";

export function getColor(state : squareState) : string {
    switch(state) {
        case squareState.visitedPath:
            return "green";
        case squareState.foundPath:
            return "yellow";
        case squareState.foundDestination:
            return "yellow";
        // TODO: Implement
        // case squareState.foundSource:
        //     return "yellow";
    }
    return "";
}