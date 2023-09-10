import { squareState } from "@/states/squareState";

export async function aStar(props: algorithmsPropsType): Promise<void> {
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

        if (props.board[currentCell.row][currentCell.col] === squareState.path) {
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

                    // Calculate the tentative G-score
                    // Assuming unit weights 
                    // TODO: Change when weighted nodes will be implemented
                    const tentativeGScore: number =
                        gScores[currentCell.row][currentCell.col] + 1;

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

                    if (props.board[newRow][newCol] === squareState.destination) {
                        break;
                    }
                }
            }
        }
    }

    await props.setIsVisualizationRunning(false);
}

// Heuristic function (Manhattan distance)
function heuristic(source: number[], destination: number[]): number {
    return (
        Math.abs(source[0] - destination[0]) + Math.abs(source[1] - destination[1])
    );
}
