import { squareState } from "@/states/squareState";

interface Cell {
  row: number;
  col: number;
  distance: number;
}

export async function bfs(board: number[][], setBoard: React.Dispatch<React.SetStateAction<number[][]>>, numRows : number, numCols : number, start: number[], delay: number) : Promise<void> {

  // Define directions: up, down, left, right
  const directions: number[][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  // Create a queue for BFS
  const queue: Cell[] = [];
  queue.push({ row: start[0], col: start[1], distance: 0 });

  // Mark the start cell as visited
  const visited: boolean[][] = new Array(numRows)
      .fill(false)
      .map(() => new Array(numCols).fill(false));

  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
      const { row, col, distance } = queue.shift() as Cell;

      // Check if we've reached the destination
      if (board[row][col] === squareState.destination) {
        alert("found");
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
            !visited[newRow][newCol]) {

            if (board[newRow][newCol] === squareState.destination) {
                alert("found");
                const newBoard = board.slice();
                newBoard[newRow][newCol] = squareState.foundDestination;
                setBoard(newBoard);
                return;
            }

            if (board[newRow][newCol] === squareState.path) {
                // Mark the new cell as visited and enqueue it
                visited[newRow][newCol] = true;
                const newBoard = board.slice();
                newBoard[newRow][newCol] = squareState.visitedPath;
                setBoard([...newBoard]);
                await new Promise((resolve) => setTimeout(resolve, delay));

                queue.push({ row: newRow, col: newCol, distance: distance + 1 });
            }
        }
    }
  }

  return;
  }
