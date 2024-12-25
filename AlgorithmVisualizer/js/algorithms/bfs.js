async function bfs(grid, startNode, endNode) {
    const queue = new Queue();
    const visitedNodes = new Set();

    // Initialize
    queue.enqueue(startNode);
    visitedNodes.add(startNode);
    startNode.distance = 0;

    while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();
        
        if (currentNode.isWall) continue;

        // Found the end node
        if (currentNode === endNode) {
            return reconstructPath(endNode);
        }

        // Visualization delay
        if (currentNode !== startNode) {
            currentNode.element.classList.add('visited');
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        // Process neighbors
        const neighbors = grid.getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            if (!visitedNodes.has(neighbor)) {
                visitedNodes.add(neighbor);
                neighbor.previousNode = currentNode;
                neighbor.distance = currentNode.distance + 1;
                queue.enqueue(neighbor);
            }
        }
    }

    return []; // No path found
}

function reconstructPath(endNode) {
    const path = [];
    let currentNode = endNode;

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return path;
}
