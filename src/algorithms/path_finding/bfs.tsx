import { SquareState } from "@/states/square_state";
import { AlgorithmsPropsType } from "@/components/props/algorithms_props";
import { Cell } from "@/types/cell_type";
import { useEffect } from "react";
import { recreatePath } from "../../utilities/recreate_path";
import { markAsVisited } from "@/utilities/mark_cell_as_visited";
import { showThereIsNoPathError } from "@/utilities/show_there_is_no_path_error";

export async function bfs(props : AlgorithmsPropsType): Promise<void> {
  await props.setIsVisualizationRunning(true);
  
  const numRows : number = props.board.length;
  const numCols : number = props.board[0].length;

  // Define directions: up, down, left, right
  const directions: number[][] = [[0, -1], [0, 1], [-1, 0], [1, 0]];

  // Create a queue for BFS
  const queue: Cell[] = [];
  const startingCell: Cell = {row: props.start[0], col: props.start[1], distance: 0, parent: null};

  queue.push(startingCell);

  // Mark the start cell as visited
  const visited: boolean[][] = new Array(numRows)
    .fill(false)
    .map(() => new Array(numCols).fill(false));

  visited[props.start[0]][props.start[1]] = true;

  while (queue.length > 0) {
    const currentCell = queue.shift() as Cell;

    // Check if we've reached the destination
    if (props.board[currentCell.row][currentCell.col].state === SquareState.destination) {
        recreatePath(currentCell, props); 
        return;   
    }

    markAsVisited(currentCell, props);


    // Explore all possible directions
    for (const [dx, dy] of directions) {
      const newRow: number = currentCell.row + dx;
      const newCol: number = currentCell.col + dy;

      // Check if the new position is within the board and not visited
      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        !visited[newRow][newCol]
      ) {
        if (props.board[newRow][newCol].state !== SquareState.obstacle) {
          // Mark the new cell as visited and enqueue it
          queue.push({
            row: newRow,
            col: newCol,
            distance: currentCell.distance + props.board[newRow][newCol].weight,
            parent: currentCell,
          });

          if(props.board[newRow][newCol].state === SquareState.destination) {
            break;
          }

          visited[newRow][newCol] = true;
          
          await new Promise((resolve) => setTimeout(resolve, props.delay));
        }
      }
    }
  }
  showThereIsNoPathError();
  await props.setIsVisualizationRunning(false);
}
