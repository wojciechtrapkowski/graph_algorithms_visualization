import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { Square } from "@/components/square";
import { SquareState } from "@/states/square_state";
import { resetBoardStates } from "@/utilities/reset_board_states";

export async function generateRandomMaze(props: AlgorithmsPropsType, isWeightNodePicked : boolean) : Promise<void> {
    const newBoard = [...props.board];
    resetBoardStates(newBoard, true);
    props.setBoard([...newBoard]);

    await props.setIsVisualizationRunning(true);
    
    const numRows: number = props.board.length;
    const numCols: number = props.board[0].length;
    
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (newBoard[i][j].state === SquareState.source) continue;
            if (newBoard[i][j].state === SquareState.destination) continue;
            
            if (Math.random() < 0.4) {
                newBoard[i][j] = {
                    ...newBoard[i][j], 
                    state: isWeightNodePicked ? SquareState.weightNode : SquareState.obstacle, 
                    weight: isWeightNodePicked ? props.weightedNodeWeight : 99,
                };
                props.setBoard([...newBoard]);
            }
            
            await new Promise((resolve) => setTimeout(resolve, props.delay));

        }
    }


    await props.setIsVisualizationRunning(false);
}