import { squareState } from "@/states/squareState";

export function getColor(state : squareState) : string {
    switch(state) {
        case squareState.visitedPath:
            return "green";
        case squareState.foundPath:
            return "yellow";
    }
    return "";
}