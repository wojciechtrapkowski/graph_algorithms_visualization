import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { SquareState } from "@/states/square_state";
import { Cell } from "@/types/cell_type";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { recreatePath } from "../../utilities/recreate_path";
import { showThereIsNoPathError } from "@/utilities/show_there_is_no_path_error";

export async function dijkstra(props: AlgorithmsPropsType): Promise<void> {
    await props.setIsVisualizationRunning(true);

    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;

    // Define directions: up, down, left, right
    const directions: number[][] = [[0, -1], [0, 1], [-1, 0], [1, 0]];

    // Create an array to store distances to each cell
    const distances: number[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(Number.MAX_VALUE)
    );

    // Create a priority queue (min heap) for Dijkstra's algorithm
    const priorityQueue: Cell[] = [];

    // Initialize the start cell
    const startCell: Cell = {
        row: props.start[0],
        col: props.start[1],
        distance: 0,
        parent: null,
    };

    priorityQueue.push(startCell);
    distances[startCell.row][startCell.col] = 0;

    while (priorityQueue.length > 0) {
        // Get the cell with the minimum distance
        priorityQueue.sort((a, b) => distances[a.row][a.col] - distances[b.row][b.col]);
        const currentCell: Cell = priorityQueue.shift() as Cell;

        // Check if we've reached the destination
        if (props.board[currentCell.row][currentCell.col].state === SquareState.destination) {
            recreatePath(currentCell, props);
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

                    // Calculate the tentative distance to the neighbor
                    let tentativeDistance: number = distances[currentCell.row][currentCell.col] + props.board[newRow][newCol].weight;

                    // Check if the new distance is shorter than the current distance
                    if (tentativeDistance < distances[newRow][newCol]) {
                        distances[newRow][newCol] = tentativeDistance;

                        // Enqueue the neighbor with the updated distance
                        priorityQueue.push({
                            row: newRow,
                            col: newCol,
                            distance: tentativeDistance,
                            parent: currentCell,
                        });

                        await new Promise((resolve) => setTimeout(resolve, props.delay));
                    }

                    if(props.board[newRow][newCol].state === SquareState.destination) {
                        break;
                    }
                }
            }
        }
    }
    showThereIsNoPathError();
    await props.setIsVisualizationRunning(false);
}
