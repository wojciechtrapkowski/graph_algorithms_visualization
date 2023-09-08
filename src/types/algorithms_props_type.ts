type algorithmsPropsType = {
    board: number[][], 
    start: number[], 
    delay: number,
    foundDestinationDelay: number,
    pathRecreationDelay: number,
    isVisualizationRunning : boolean,
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>, 
    setIsVisualizationRunning: React.Dispatch<React.SetStateAction<boolean>>,
  }