class Grid {
    constructor(rows = 20, cols = 40) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
        this.mouseDown = false;
        this.movingStart = false;
        this.movingEnd = false;
        this.obstacleMode = false;
        this.initializeGrid();
        this.setupEventListeners();
    }

    initializeGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.style.gridTemplateColumns = `repeat(${this.cols}, 25px)`;

        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                this.grid[row][col] = {
                    element: cell,
                    row,
                    col,
                    isWall: false,
                    isWeight: false,
                    weight: 1,
                    isStart: false,
                    isEnd: false,
                    isVisited: false,
                    isPath: false,
                    distance: Infinity,
                    previousNode: null
                };

                gridElement.appendChild(cell);
            }
        }

        // Set initial start and end nodes
        this.setStartNode(10, 10);
        this.setEndNode(10, 30);
    }

    setupEventListeners() {
        document.getElementById('grid').addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            const cell = e.target;
            if (cell.classList.contains('grid-cell')) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                
                if (this.grid[row][col].isStart) {
                    this.movingStart = true;
                } else if (this.grid[row][col].isEnd) {
                    this.movingEnd = true;
                } else if (this.obstacleMode) {
                    this.toggleObstacle(row, col);
                } else {
                    this.toggleWall(row, col);
                }
            }
        });

        document.getElementById('grid').addEventListener('mousemove', (e) => {
            if (!this.mouseDown) return;
            
            const cell = e.target;
            if (cell.classList.contains('grid-cell')) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                
                if (this.movingStart) {
                    this.setStartNode(row, col);
                } else if (this.movingEnd) {
                    this.setEndNode(row, col);
                } else if (this.obstacleMode) {
                    this.toggleObstacle(row, col);
                } else {
                    this.toggleWall(row, col);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            this.mouseDown = false;
            this.movingStart = false;
            this.movingEnd = false;
        });

        // Obstacle controls
        const obstacleToggle = document.getElementById('obstacle-toggle');
        const obstacleType = document.getElementById('obstacle-type');

        obstacleToggle.addEventListener('change', (e) => {
            this.obstacleMode = e.target.checked;
            obstacleType.disabled = !e.target.checked;
        });

        document.getElementById('clear-btn').addEventListener('click', () => this.clearGrid());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGrid());
    }

    toggleObstacle(row, col) {
        const node = this.grid[row][col];
        const obstacleType = document.getElementById('obstacle-type').value;
        
        if (!node.isStart && !node.isEnd) {
            if (obstacleType === 'wall') {
                node.isWall = !node.isWall;
                node.isWeight = false;
                node.weight = 1;
                node.element.classList.toggle('wall');
                node.element.classList.remove('weight');
            } else if (obstacleType === 'weight') {
                node.isWeight = !node.isWeight;
                node.isWall = false;
                node.weight = node.isWeight ? 5 : 1;
                node.element.classList.toggle('weight');
                node.element.classList.remove('wall');
            }
        }
    }

    toggleWall(row, col) {
        const node = this.grid[row][col];
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
            node.element.classList.toggle('wall');
        }
    }

    clearGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.grid[row][col];
                node.isWall = false;
                node.isWeight = false;
                node.weight = 1;
                node.isVisited = false;
                node.isPath = false;
                node.distance = Infinity;
                node.previousNode = null;
                node.element.className = 'grid-cell';
                if (node.isStart) node.element.classList.add('start');
                if (node.isEnd) node.element.classList.add('end');
            }
        }
    }

    resetGrid() {
        this.clearGrid();
        this.setStartNode(10, 10);
        this.setEndNode(10, 30);
    }

    getNeighbors(node) {
        const neighbors = [];
        const { row, col } = node;
        
        if (row > 0) neighbors.push(this.grid[row - 1][col]); // Up
        if (row < this.rows - 1) neighbors.push(this.grid[row + 1][col]); // Down
        if (col > 0) neighbors.push(this.grid[row][col - 1]); // Left
        if (col < this.cols - 1) neighbors.push(this.grid[row][col + 1]); // Right
        
        return neighbors.filter(neighbor => !neighbor.isWall);
    }

    setStartNode(row, col) {
        if (this.startNode) {
            this.startNode.isStart = false;
            this.startNode.element.classList.remove('start');
        }
        this.startNode = this.grid[row][col];
        this.startNode.isStart = true;
        this.startNode.element.classList.add('start');
    }

    setEndNode(row, col) {
        if (this.endNode) {
            this.endNode.isEnd = false;
            this.endNode.element.classList.remove('end');
        }
        this.endNode = this.grid[row][col];
        this.endNode.isEnd = true;
        this.endNode.element.classList.add('end');
    }
}
