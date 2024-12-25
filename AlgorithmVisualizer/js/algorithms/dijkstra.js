async function dijkstra(grid, startNode, endNode) {
    const minHeap = new MinHeap();
    const visitedNodes = new Set();

    // Initialize distances
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            const node = grid.grid[row][col];
            node.distance = Infinity;
            node.previousNode = null;
        }
    }

    // Set start node distance to 0 and add to heap
    startNode.distance = 0;
    minHeap.insert(startNode);

    while (!minHeap.isEmpty()) {
        const currentNode = minHeap.extractMin();

        if (currentNode.isWall) continue;
        if (visitedNodes.has(currentNode)) continue;

        visitedNodes.add(currentNode);
        currentNode.isVisited = true;

        if (currentNode === endNode) {
            return reconstructPath(endNode);
        }

        // Visualization delay
        if (currentNode !== startNode) {
            currentNode.element.classList.add('visited');
            await new Promise(resolve => setTimeout(resolve, 10));
        }

        // Update neighbors
        const neighbors = grid.getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            if (!visitedNodes.has(neighbor)) {
                const distance = currentNode.distance + neighbor.weight; // Use node weight
                if (distance < neighbor.distance) {
                    neighbor.distance = distance;
                    neighbor.previousNode = currentNode;
                    minHeap.insert(neighbor);
                }
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
