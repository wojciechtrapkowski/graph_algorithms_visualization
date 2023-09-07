import { squareState } from "@/states/squareState";

export function resetBoard(board: number[][]): void {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
        if (
            board[i][j] !== squareState.source &&
            board[i][j] !== squareState.destination &&
            board[i][j] !== squareState.obstacle
        ) {
            board[i][j] = squareState.path;
        }
        }
    }
}