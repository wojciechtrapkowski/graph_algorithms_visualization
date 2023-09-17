// Heuristic function (Manhattan distance)
export function heuristic(source: number[], destination: number[]): number {
    return (
        Math.abs(source[0] - destination[0]) + Math.abs(source[1] - destination[1])
    );
}
