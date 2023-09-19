import { SquareState } from "@/states/square_state";
import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { Cell } from "@/types/cell_type";
import { useEffect } from "react";
import { recreatePath } from "../../utilities/recreate_path";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { showThereIsNoPathError } from "@/utilities/show_there_is_no_path_error";

export async function dfs(props: AlgorithmsPropsType): Promise<void> {
    await props.setIsVisualizationRunning(true);

    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;

    const directions: number[][] = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    
    // Create a stack for DFS
    const stack: Cell[] = [];
    const startingCell: Cell = {row: props.start[0], col: props.start[1], distance: 0, parent: null};

    stack.push(startingCell);
  
    // Mark the start cell as visited
    const visited: boolean[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(false)
    );

    visited[props.start[0]][props.start[1]] = true;

    while (stack.length > 0) {
        const currentCell = stack.pop() as Cell;

        // Check if we've reached the destination
        if (props.board[currentCell.row][currentCell.col].state === SquareState.destination) {
            recreatePath(currentCell, props); 
            return;
        }

        markAsVisited(currentCell, props);

        visited[currentCell.row][currentCell.col] = true;

        // Explore all possible directions
        for (const [dx, dy] of directions) {
            const newRow: number = currentCell.row + dx;
            const newCol: number = currentCell.col + dy;

            // Check if the new position is within the board and not visited
            if (
                newRow >= 0 &&
                newRow < numRows &&
                newCol >= 0 &&
                newCol < numCols &&
                !visited[newRow][newCol]
            ) {

                if (props.board[newRow][newCol].state !== SquareState.obstacle) {
                    // Push new cell onto the stack
                    stack.push({
                        row: newRow,
                        col: newCol,
                        distance: currentCell.distance + props.board[newRow][newCol].weight,
                        parent: currentCell,
                    });

                    await new Promise((resolve) => setTimeout(resolve, props.delay));
                }
            }
        }
    }
    showThereIsNoPathError();
    await props.setIsVisualizationRunning(false);
}
