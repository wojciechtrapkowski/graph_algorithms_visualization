import { squareState } from "@/states/squareState";

// Define a function for Dijkstra's algorithm
export async function dijkstra(props: algorithmsPropsType): Promise<void> {
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
        if (props.board[currentCell.row][currentCell.col] === squareState.destination) {
            const newBoard = props.board.slice();
            newBoard[currentCell.row][currentCell.col] = squareState.foundDestination;
            props.setBoard([...newBoard]);
            await new Promise((resolve) => setTimeout(resolve, props.foundDestinationDelay));

            let pathCell: any = currentCell;
            const path: Cell[] = [];

            // Recreate the shortest path
            while (pathCell) {
                if (props.board[pathCell.row][pathCell.col] === squareState.visitedPath) {
                    newBoard[pathCell.row][pathCell.col] = squareState.foundPath;
                    props.setBoard([...newBoard]);
                    await new Promise((resolve) => setTimeout(resolve, props.delay));
                }

                path.unshift(pathCell);
                pathCell = pathCell.parent;
            }

            props.setIsVisualizationRunning(false);
            return;
        }

        if(props.board[currentCell.row][currentCell.col] === squareState.path) {
            const newBoard = props.board.slice();
            newBoard[currentCell.row][currentCell.col] = squareState.visitedPath;
            props.setBoard([...newBoard]);
        }

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
                if (props.board[newRow][newCol] !== squareState.obstacle) {

                    // Calculate the tentative distance to the neighbor
                    // Assuming unit weights 
                    // TODO: Change when weighted nodes will be implemented
                    let tentativeDistance: number = distances[currentCell.row][currentCell.col] + 1;

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

                    if(props.board[newRow][newCol] === squareState.destination) {
                        break;
                    }
                }
            }
        }
    }

    await props.setIsVisualizationRunning(false);
}
