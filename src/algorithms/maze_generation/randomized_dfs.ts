import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { SquareState } from "@/states/square_state";
import { Cell } from "@/types/cell_type";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { resetBoardStates } from "@/utilities/reset_board_states";

export async function generateRandomizedDFSMaze(props: AlgorithmsPropsType, isWeightNodePicked : boolean): Promise<void> {
    await props.setIsVisualizationRunning(true);

    const newBoard = [...props.board];
    resetBoardStates(newBoard, true);
    props.setBoard([...newBoard]);

    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;

    let directions: number[][] = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    
    const stack: Cell[] = [];
    const startingCell: Cell = {row: props.start[0], col: props.start[1], distance: 0, parent: null};

    stack.push(startingCell);
  
    const visited: boolean[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(false)
    );

    visited[props.start[0]][props.start[1]] = true;

    while (stack.length > 0) {
        const currentCell = stack.pop() as Cell;
        directions = [...directions].sort(() => Math.random() - 0.5);

        for (const [dx, dy] of directions) {
            const newRow: number = currentCell.row + dx;
            const newCol: number = currentCell.col + dy;

            if (
                newRow >= 0 &&
                newRow < numRows &&
                newCol >= 0 &&
                newCol < numCols &&
                !visited[newRow][newCol]
            ) {
                if(props.board[newRow][newCol].state === SquareState.destination) {
                    continue;
                }

                stack.push(currentCell);

                if (Math.random() < 0.3) {
                    const newBoard = [...props.board];
                    newBoard[newRow][newCol] = {
                        ...newBoard[newRow][newCol], 
                        state: isWeightNodePicked ? SquareState.weightNode : SquareState.obstacle, 
                        weight: isWeightNodePicked ? props.weightedNodeWeight : 99,
                    };
                    props.setBoard([...newBoard]);
                }

                stack.push({
                    row: newRow,
                    col: newCol,
                    distance: currentCell.distance + props.board[newRow][newCol].weight,
                    parent: currentCell,
                });

                visited[newRow][newCol] = true;
                await new Promise((resolve) => setTimeout(resolve, props.delay));
                break;
            }
        }
    }
    await props.setIsVisualizationRunning(false);
}
