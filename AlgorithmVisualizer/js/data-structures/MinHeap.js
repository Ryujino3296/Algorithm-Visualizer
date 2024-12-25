class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let currentIndex = this.heap.length - 1;

        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex);

            if (this.heap[parentIndex].distance <= this.heap[currentIndex].distance) {
                break;
            }

            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);

        return min;
    }

    sinkDown(index) {
        const minIndex = index;
        const leftIndex = this.getLeftChildIndex(index);
        const rightIndex = this.getRightChildIndex(index);

        if (leftIndex < this.heap.length && 
            this.heap[leftIndex].distance < this.heap[minIndex].distance) {
            minIndex = leftIndex;
        }

        if (rightIndex < this.heap.length && 
            this.heap[rightIndex].distance < this.heap[minIndex].distance) {
            minIndex = rightIndex;
        }

        if (minIndex !== index) {
            this.swap(index, minIndex);
            this.sinkDown(minIndex);
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    decreaseKey(node) {
        const index = this.heap.findIndex(n => n === node);
        if (index !== -1) {
            this.bubbleUp(index);
        }
    }
}
