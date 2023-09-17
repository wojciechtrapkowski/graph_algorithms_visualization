export type Cell = {
    row: number;
    col: number;
    distance: number;
    parent?: Cell | null;
  }
  