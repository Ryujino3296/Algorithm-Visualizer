class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
    }

    enqueue(item) {
        this.items[this.rear] = item;
        this.rear++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const item = this.items[this.front];
        this.front++;
        
        // Reset indices if queue is empty
        if (this.front === this.rear) {
            this.front = 0;
            this.rear = 0;
        }
        
        return item;
    }

    isEmpty() {
        return this.front === this.rear;
    }

    size() {
        return this.rear - this.front;
    }
}
