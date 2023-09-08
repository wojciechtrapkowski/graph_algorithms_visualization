import { squareState } from "@/states/squareState";

export function resetBoardStates(board: number[][], fullReset? : boolean): void {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if(board[i][j] === squareState.foundDestination) {
                board[i][j] = squareState.destination;
            }
            if (
                (board[i][j] !== squareState.source &&
                board[i][j] !== squareState.destination &&
                board[i][j] !== squareState.obstacle ) || fullReset === true
            ) {
                board[i][j] = squareState.path;
            }
        }
    }
}