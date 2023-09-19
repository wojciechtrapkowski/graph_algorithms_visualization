import { AlgorithmDescriptionProps } from "./props/algorithm_description_props";

export const AlgorithmDescription = (props : AlgorithmDescriptionProps) => {
    let description = '';

    switch (props.algorithm) {
      case 'BFS':
        description = 'Breadth-First Search (BFS) is an algorithm that <strong> does not </strong> handle weighted graphs, but <strong> does guarantee </strong> shortest path on unweighted ones.';
        break;
      case 'DFS':
        description = 'Depth-First Search (DFS) is an algorithm that <strong> does not </strong> handle weighted graphs, and <strong> does not </strong> guarantee the shortest path.';
        break;
      case 'A*':
        description = 'A* is an algorithm that <strong> does </strong> handle weighted graphs, and <strong> does guarantee </strong> the shortest path.';
        break;
      case 'Dijkstra':
        description = 'Dijkstra\'s algorithm is an algorithm that <strong> does </strong> handle weighted graphs, and <strong> does guarantee </strong> the shortest path.';
        break;
      case 'Greedy Best-First Search':
        description='Greedy Best-First Search is an algorithm that <strong> does </strong> handle weighted graphs, and <strong> does not </strong> guarantee the shortest path.'
        break;
      default:
        description = 'Select an algorithm to see its description.';
        break;
    }
  
    return (
      <div className="text-xl text-center mt-8 mb-2 mx-3">
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    );  
}