import { SquareState } from "@/states/square_state";
import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { Cell } from "@/types/cell_type";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { heuristic } from "@/utilities/heuristic";
import { recreatePath } from "@/utilities/recreate_path";
import { showThereIsNoPathError } from "@/utilities/show_there_is_no_path_error";

export async function greedyBestFirstSearch(props: AlgorithmsPropsType): Promise<void> {
    await props.setIsVisualizationRunning(true);

    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;

    const directions: number[][] = [[0, -1], [0, 1], [-1, 0], [1, 0]];

    // Create a priority queue (min heap) for GBFS
    const openSet: Cell[] = [];

    const startCell: Cell = {
        row: props.start[0],
        col: props.start[1],
        distance: 0,
        parent: null,
    };

    openSet.push(startCell);

    // Create a visited array to keep track of visited cells
    const visited: boolean[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(false)
    );

    while (openSet.length > 0) {
        // Get the cell with the lowest heuristic value
        openSet.sort(
            (a, b) => heuristic([a.row, a.col], props.destination, props.board[a.row][a.col].weight) - heuristic([b.row, b.col], props.destination, props.board[b.row][b.col].weight)
        );

        const currentCell: Cell = openSet.shift() as Cell;

        // Check if we've reached the destination
        if (props.board[currentCell.row][currentCell.col].state === SquareState.destination) {
            recreatePath(currentCell, props)
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
                    openSet.push({ 
                        row: newRow,
                        col: newCol,
                        distance: 0, // GBFS only uses heuristic, so distance is set to 0
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
