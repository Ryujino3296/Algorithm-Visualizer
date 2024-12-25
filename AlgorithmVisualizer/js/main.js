let grid;
let isVisualizing = false;

document.addEventListener('DOMContentLoaded', () => {
    grid = new Grid();

    document.getElementById('start-btn').addEventListener('click', async () => {
        if (isVisualizing) return;
        isVisualizing = true;
        
        const algorithm = document.getElementById('algorithm-select').value;
        await visualizeAlgorithm(algorithm);
        
        isVisualizing = false;
    });
});

async function visualizeAlgorithm(algorithm) {
    // Clear previous visualization
    grid.clearGrid();
    
    let path;
    switch (algorithm) {
        case 'bfs':
            path = await bfs(grid, grid.startNode, grid.endNode);
            break;
        case 'dfs':
            path = await dfs(grid, grid.startNode, grid.endNode);
            break;
        case 'dijkstra':
            path = await dijkstra(grid, grid.startNode, grid.endNode);
            break;
    }

    // Visualize the path
    await visualizePath(path);
}

async function visualizePath(path) {
    for (let i = 0; i < path.length; i++) {
        const node = path[i];
        if (node !== grid.startNode && node !== grid.endNode) {
            node.element.classList.add('path');
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}
