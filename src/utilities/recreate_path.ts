import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { Cell } from "@/types/cell_type";

export async function recreatePath(destinationCell : any, props : AlgorithmsPropsType) : Promise<void>{
    const newBoard = [...props.board]; 
      
    newBoard[destinationCell['row']][destinationCell['col']] = {
        ...newBoard[destinationCell['row']][destinationCell['col']],
        classes: [...newBoard[destinationCell['row']][destinationCell['col']].classes, "found-destination", "path"]
    };

    props.setBoard(newBoard);

    await new Promise((resolve) => setTimeout(resolve, props.foundDestinationDelay));


    let currentCell: any = { row: destinationCell['row'], col: destinationCell['col'], distance: destinationCell['distance'], parent: destinationCell['parent'] };      
    const path: Cell[] = [];

    while (currentCell) {
        if(props.board[currentCell['row']][currentCell['col']].classes.includes("visited")) {
            const newBoard = [...props.board]; 
        
            newBoard[currentCell['row']][currentCell['col']] = {
                ...newBoard[currentCell['row']][currentCell['col']],
                classes: [...newBoard[currentCell['row']][currentCell['col']].classes, "path"]
            };

            props.setBoard(newBoard);
            await new Promise((resolve) => setTimeout(resolve, props.delay));

        }

        path.unshift(currentCell);
        currentCell = currentCell['parent'];
    }

    newBoard[props.start[0]][props.start[1]] = {
    ...newBoard[props.start[0]][props.start[1]],
    classes: [...newBoard[props.start[0]][props.start[1]].classes, "path"]
    };

    props.setBoard(newBoard);

    props.setIsVisualizationRunning(false);
}
  