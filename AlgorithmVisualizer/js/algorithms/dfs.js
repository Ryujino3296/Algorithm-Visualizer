async function dfs(grid, startNode, endNode) {
    const stack = [startNode];
    const visitedNodes = [];
    startNode.distance = 0;

    while (stack.length > 0) {
        const currentNode = stack.pop();
        
        if (currentNode.isWall) continue;
        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;
        visitedNodes.push(currentNode);

        if (currentNode === endNode) {
            return reconstructPath(endNode);
        }

        const neighbors = grid.getNeighbors(currentNode);
        for (const neighbor of neighbors.reverse()) {
            if (!neighbor.isVisited) {
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
            }
        }

        // Visualization delay
        if (currentNode !== startNode) {
            currentNode.element.classList.add('visited');
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }

    return []; // No path found
}
