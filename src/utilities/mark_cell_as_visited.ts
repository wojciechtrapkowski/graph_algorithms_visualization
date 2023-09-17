import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { SquareState } from "@/states/square_state";
import { Cell } from "@/types/cell_type";

export function markAsVisited(currentCell : Cell, props: AlgorithmsPropsType) {
    if (props.board[currentCell.row][currentCell.col].state === SquareState.obstacle) {
        return;
    }
    
    const newBoard = [...props.board];
    newBoard[currentCell.row][currentCell.col] = {
        ...newBoard[currentCell.row][currentCell.col], 
        classes: [...newBoard[currentCell.row][currentCell.col].classes, "visited"], 
    };
    props.setBoard([...newBoard]);        
}