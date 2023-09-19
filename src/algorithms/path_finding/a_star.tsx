import { SquareState } from "@/states/square_state";
import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { Cell } from "@/types/cell_type";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { heuristic } from "@/utilities/heuristic";
import { recreatePath } from "@/utilities/recreate_path";
import { showThereIsNoPathError } from "@/utilities/show_there_is_no_path_error";
export async function aStar(props: AlgorithmsPropsType): Promise<void> {
    await props.setIsVisualizationRunning(true);

    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;

    const directions: number[][] = [[0, -1], [0, 1], [-1, 0], [1, 0]];

    const gScores: number[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(Number.MAX_VALUE)
    );

    const fScores: number[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(Number.MAX_VALUE)
    );

    // Create a priority queue (min heap)
    const openSet: Cell[] = [];

    const startCell: Cell = {
        row: props.start[0],
        col: props.start[1],
        distance: 0,
        parent: null,
    };

    openSet.push(startCell);
    gScores[startCell.row][startCell.col] = 0;
    fScores[startCell.row][startCell.col] = heuristic([startCell.row, startCell.col], props.destination);

    while (openSet.length > 0) {
        // Get the cell with the lowest F-score
        openSet.sort(
            (a, b) => fScores[a.row][a.col] - fScores[b.row][b.col]
        );

        const currentCell: Cell = openSet.shift() as Cell;

        // Check if we've reached the destination
        if (props.board[currentCell.row][currentCell.col].state === SquareState.destination) {
            recreatePath(currentCell, props)
            return;
        }

        markAsVisited(currentCell, props);

        // Explore all possible directions
        for (const [dx, dy] of directions) {
            const newRow: number = currentCell.row + dx;
            const newCol: number = currentCell.col + dy;
            
            // Check if the new position is within the board
            if (
                newRow >= 0 &&
                newRow < numRows &&
                newCol >= 0 &&
                newCol < numCols
            ) {
                if (props.board[newRow][newCol].state !== SquareState.obstacle) {
                    // Calculate the tentative G-score
                    const tentativeGScore: number =
                        gScores[currentCell.row][currentCell.col] + props.board[newRow][newCol].weight;

                    // Check if the new F-score is better than the current F-score
                    if (tentativeGScore < gScores[newRow][newCol]) {
                        gScores[newRow][newCol] = tentativeGScore;
                        
                        fScores[newRow][newCol] = tentativeGScore + heuristic([newRow, newCol], props.destination);

                        openSet.push({ 
                            row: newRow,
                            col: newCol,
                            distance: tentativeGScore,
                            parent: currentCell,
                        });

                        await new Promise((resolve) => setTimeout(resolve, props.delay));
                    }

                    if (props.board[newRow][newCol].state === SquareState.destination) {
                        break;
                    }
                }
            }
        }
    }
    showThereIsNoPathError();
    await props.setIsVisualizationRunning(false);
}