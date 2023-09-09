import { squareState } from "@/states/squareState";
import { useEffect } from "react";

export async function dfs(props: algorithmsPropsType): Promise<void> {
    await props.setIsVisualizationRunning(true);

    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;

    const directions: number[][] = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    
    // Create a stack for DFS
    const stack: Cell[] = [];
    stack.push({ row: props.start[0], col: props.start[1], distance: 0, parent: null });

    // Mark the start cell as visited
    const visited: boolean[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(false)
    );

    visited[props.start[0]][props.start[1]] = true;

    while (stack.length > 0) {
        const { row, col, distance, parent } = stack.pop() as Cell;

        if(props.board[row][col] === squareState.path) {
            const newBoard = props.board.slice();
            newBoard[row][col] = squareState.visitedPath;
            props.setBoard([...newBoard]);
        }

        // Check if we've reached the destination
        if (props.board[row][col] === squareState.destination) {
            const newBoard = props.board.slice();
            newBoard[row][col] = squareState.foundDestination;
            props.setBoard([...newBoard]);
            await new Promise((resolve) => setTimeout(resolve, props.foundDestinationDelay));

            let currentCell: any = { row, col, distance, parent };
            const path: Cell[] = [];

            // Recreate path
            while (currentCell) {
                if (props.board[currentCell.row][currentCell.col] === squareState.visitedPath) {
                    newBoard[currentCell.row][currentCell.col] = squareState.foundPath;
                    props.setBoard([...newBoard]);
                    await new Promise((resolve) => setTimeout(resolve, props.delay));
                }

                path.unshift(currentCell);
                currentCell = currentCell.parent;
            }
            props.setIsVisualizationRunning(false);
            return;
        }

        visited[row][col] = true;

        // Explore all possible directions
        for (const [dx, dy] of directions) {
            const newRow: number = row + dx;
            const newCol: number = col + dy;

            // Check if the new position is within the board and not visited
            if (
                newRow >= 0 &&
                newRow < numRows &&
                newCol >= 0 &&
                newCol < numCols &&
                !visited[newRow][newCol]
            ) {

                if (props.board[newRow][newCol] !== squareState.obstacle) {
                    // Push new cell onto the stack
                    stack.push({
                        row: newRow,
                        col: newCol,
                        distance: distance + 1,
                        parent: { row, col, distance, parent },
                    });

                    await new Promise((resolve) => setTimeout(resolve, props.delay));
                }
            }
        }
        }
    await props.setIsVisualizationRunning(false);
    return;
}
