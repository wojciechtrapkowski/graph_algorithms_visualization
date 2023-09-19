import { SquareState } from "@/states/square_state";
import { SquareType } from "@/types/square_type";

export function resetBoardStates(board: SquareType[][], fullReset? : boolean): void {
    let classesToRemove = ["path", "visited", "found-destination"];
    let numRows = board.length;
    let numCols = board[0].length;

    if (fullReset) {
        classesToRemove.push("destination");
    }
    
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (fullReset === true) {
                board[i][j].state = SquareState.path;
                board[i][j].weight = 1;
            }
            board[i][j].classes = board[i][j].classes.filter(
                (className) => !classesToRemove.includes(className)
            );
        }
    }
    if (fullReset) {
        board[0][0].state = SquareState.source;
        board[numRows-1][numCols-1].state = SquareState.destination;
        board[numRows-1][numCols-1].classes = ["destination"];
    }
}