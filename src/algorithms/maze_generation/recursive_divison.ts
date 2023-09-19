import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { SquareState } from "@/states/square_state";
import { resetBoardStates } from "@/utilities/reset_board_states";

export async function generateRecursiveDivisionMaze(props: AlgorithmsPropsType, isWeightNodePicked : boolean): Promise<void> {
    await props.setIsVisualizationRunning(true);

    const newBoard = [...props.board];
    resetBoardStates(newBoard, true);
    props.setBoard([...newBoard]);

    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;

    // Create a grid to represent the maze
    const maze: number[][] = Array.from({ length: numRows }, () =>
        Array(numCols).fill(0)
    );

    // Generate the maze recursively
    await recursiveDivision(maze, 0, numRows - 1, 0, numCols - 1, props, isWeightNodePicked);

    await props.setIsVisualizationRunning(false);
}

async function recursiveDivision(
    maze: number[][],
    top: number,
    bottom: number,
    left: number,
    right: number,
    props: AlgorithmsPropsType,
    isWeightNodePicked: boolean,
) {
    if (top >= bottom || left >= right) {
        return;
    }

    // Choose a random horizontal or vertical wall to divide
    const horizontal = Math.random() < 0.5;
    const wallRow = top + Math.floor(Math.random() * (bottom - top + 1));
    const wallCol = left + Math.floor(Math.random() * (right - left + 1));

    // Create an opening in the wall
    if (horizontal) {
        const passageCol = left + Math.floor(Math.random() * (right - left + 1));
        for (let i = left; i <= right; i++) {
            if (i !== passageCol  && Math.random() < 0.6) {
                maze[wallRow][i] = 1;
                
                if (props.board[wallRow][i].state === SquareState.source) {
                    continue;
                }
                if (props.board[wallRow][i].state === SquareState.destination) {
                    continue;
                }

                props.setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];

                    newBoard[wallRow][i].state = isWeightNodePicked ? SquareState.weightNode : SquareState.obstacle;
                    newBoard[wallRow][i].weight = isWeightNodePicked ? props.weightedNodeWeight : 99;
                    
                    return newBoard;
                });

                await new Promise((resolve) => setTimeout(resolve, props.delay));
            
            }
        }
        maze[wallRow][passageCol] = 0;
    } else {
        const passageRow = top + Math.floor(Math.random() * (bottom - top + 1));
        for (let i = top; i <= bottom; i++) {
            if (i !== passageRow  && Math.random() < 0.6)  {
                maze[i][wallCol] = 1;
                
                if (props.board[i][wallCol].state === SquareState.source) {
                    continue;
                }
                if (props.board[i][wallCol].state === SquareState.destination) {
                    continue;
                }

                props.setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    
                    newBoard[i][wallCol].state = isWeightNodePicked ? SquareState.weightNode : SquareState.obstacle;
                    newBoard[i][wallCol].weight = isWeightNodePicked ? props.weightedNodeWeight : 99;
                    
                    return newBoard;
                });

                await new Promise((resolve) => setTimeout(resolve, props.delay));

            }
        }
        maze[passageRow][wallCol] = 0;
    }

    // Recursively divide the subsegments
    await recursiveDivision(maze, top, horizontal ? wallRow - 1 : bottom, left, horizontal ? right : wallCol - 1, props, isWeightNodePicked);
    await recursiveDivision(maze, horizontal ? wallRow + 1 : top, bottom, horizontal ? left : wallCol + 1, right, props, isWeightNodePicked);
}
