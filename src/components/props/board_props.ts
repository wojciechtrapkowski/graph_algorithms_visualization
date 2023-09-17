import { SquareType } from "@/types/square_type";

export type BoardProps = {
    board: SquareType[][],
    setBoard : React.Dispatch<React.SetStateAction<SquareType[][]>>,
    isVisualizationRunning: boolean, 
    setIsVisualizationRunning: React.Dispatch<React.SetStateAction<boolean>>,
    getIsWeightNodePicked: () => boolean,
    weightedNodeWeight: number,
}