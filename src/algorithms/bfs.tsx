import { squareState } from "@/states/squareState";

export async function bfs(props : algorithmsPropsType): Promise<void> {
  props.setIsVisualizationRunning(true);
  const numRows : number = props.board.length;
  const numCols : number = props.board[0].length;

  // Define directions: up, down, left, right
  const directions: number[][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  // Create a queue for BFS
  const queue: Cell[] = [];
  queue.push({ row: props.start[0], col: props.start[1], distance: 0, parent: null });

  // Mark the start cell as visited
  const visited: boolean[][] = new Array(numRows)
    .fill(false)
    .map(() => new Array(numCols).fill(false));

  visited[props.start[0]][props.start[1]] = true;

  while (queue.length > 0) {
    const { row, col, distance, parent } = queue.shift() as Cell;

    // Check if we've reached the destination
    if (props.board[row][col] === squareState.destination) {
      const newBoard = props.board.slice();
      // newBoard[row][col] = squareState.foundDestination;
      // props.setBoard([...newBoard]);

      let currentCell: any = { row, col, distance, parent };
      const path: Cell[] = [];
    
      // Recreate path
      while (currentCell) {
        if(props.board[currentCell['row']][currentCell['col']] === squareState.visitedPath) {
          newBoard[currentCell['row']][currentCell['col']] = squareState.foundPath; 
          props.setBoard([...newBoard]);
          await new Promise((resolve) => setTimeout(resolve, props.delay));

        }

        path.unshift(currentCell);
        currentCell = currentCell['parent'];
      }
      props.setIsVisualizationRunning(false);
      return;    
    }

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
          // Mark the new cell as visited and enqueue it

          queue.push({
            row: newRow,
            col: newCol,
            distance: distance + 1,
            parent: { row: row, col: col, distance: distance, parent: parent},
          });

          if(props.board[newRow][newCol] === squareState.destination) {
            break;
          }

          visited[newRow][newCol] = true;

          const newBoard = props.board.slice();
          newBoard[newRow][newCol] = squareState.visitedPath;
          props.setBoard([...newBoard]);
          await new Promise((resolve) => setTimeout(resolve, props.delay));
        }
      }
    }
  }
  props.setIsVisualizationRunning(false);
  return;
}
