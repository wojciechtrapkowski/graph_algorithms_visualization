import { SquareState } from "@/states/square_state";
import { SquareType } from "@/types/square_type";

export function resetBoardStates(board: SquareType[][], fullReset? : boolean): void {
    let classesToRemove = ["path", "visited", "found-destination"];
    if (fullReset) {
        classesToRemove.push("destination");
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (fullReset === true) {
                board[i][j].state = SquareState.path;
            }
            board[i][j].classes = board[i][j].classes.filter(
                (className) => !classesToRemove.includes(className)
            );
        }
    }
}