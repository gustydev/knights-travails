class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

function sortArray(arr) {
    arr.sort((a, b) => { return a - b }); // Sorts numerically
    arr = [...new Set(arr)]; // Removes duplicates
    return arr;
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(sortArray(arr));
    }
    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) {
            return null; // Base case
        }
        const mid = Math.round((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);
        return node;
    }
    preOrder(callback, current = this.root, values = []) {
        if (current === null) {
            return;
        }
        if (callback) {
            callback(current)
            this.preOrder(callback, current.left);
            this.preOrder(callback, current.right);
        } else {
            values.push(current.data);
            this.preOrder(null, current.left, values);
            this.preOrder(null, current.right, values)
        }
        return values;
    }
    levelOrder(callback, current = this.root) {
        if (current === null) {
            return;
        }
        const queue = [];
        const values = [];
        queue.push(current);
        while (queue.length > 0) {
            let front = queue.shift();
            if (callback) {
                callback(front)
            } else {
                values.push(front.data)
            }
            if (front.left !== null) { queue.push(front.left) }
            if (front.right !== null) { queue.push(front.right) }
        }
        return values;
    }
    inOrder(callback, current = this.root, values = []) {
        if (current === null) {
            return;
        }
        if (callback) {
            this.inOrder(callback, current.left);
            callback(current)
            this.inOrder(callback, current.right);
        } else {
            this.inOrder(null, current.left, values);
            values.push(current.data);
            this.inOrder(null, current.right, values)
        }
        return values;
    }
    postOrder(callback, current = this.root, values = []) {
        if (current === null) {
            return;
        }
        if (callback) {
            this.postOrder(callback, current.left);
            this.postOrder(callback, current.right);
            callback(current)
        } else {
            this.postOrder(null, current.left, values);
            this.postOrder(null, current.right, values)
            values.push(current.data);
        }
        return values;
    }
    find(value) {
        let current = this.root;
        while ((current)) {
            if (value === current.data) {
                return current;
            } else {
                if (value > current.data) {
                    current = current.right;
                } else if (value < current.data) {
                    current = current.left;
                }
            }
        }
        if (!current) {
            // value not found
            return null;
        }
    }
    insert(value) {
        if (this.find(value)) {
            throw new Error('Value is already in the tree')
        }
        let current = this.root;
        let previous;
        while ((current)) {
            previous = current;
            if (value > current.data) {
                current = current.right;
            } else {
                current = current.left;
            }
        }
        if (!current) {
            if (previous.data < value) {
                previous.right = new Node(value);
            } else {
                previous.left = new Node(value);
            }
            return;
        }
    }
    delete(value) {
        if (!this.find(value)) {
            throw new Error('Value is not in the tree');
        }
        let current = this.root;
        let previous;
        while (current.data !== value) {
            previous = current;
            if (value > current.data) {
                current = current.right;
            } else {
                current = current.left;
            }
        }
        if (current.left === null && current.right === null) {
            // Case 1: node is a leaf
            if (current.data > previous.data) {
                previous.right = null;
            } else {
                previous.left = null;
            }
        } else if (Boolean(current.left) !== Boolean(current.right)) {
            // Case 2: node has one child
            let replacer;
            if (current.left !== null) { replacer = current.left }
            else { replacer = current.right }
            if (replacer.data < previous.data) {
                previous.left = replacer;
            } else {
                previous.right = replacer;
            }
        } else if (current.left && current.right) {
            // Case 3: node has two children
            const values = sortArray(this.preOrder());
            let succValue = values.find((n) => n > current.data);
            let succNode = this.root;
            while (succNode.data !== succValue) {
                if (succValue > succNode.data) {
                    succNode = succNode.right;
                } else {
                    succNode = succNode.left;
                }
            }
            this.delete(succNode.data);
            current.data = succNode.data;
        }
    }
    depth(node) {
        if (!(this.find(node.data))) {
            throw new Error('Node not found')
        }
        let edges = 1;
        let current = this.root;
        while (current.data !== node.data) {
            if (node.data > current.data) {
                current = current.right;
            } else {
                current = current.left
            }
            edges += 1;
        }
        return edges;
    }
    height(node) {
        if (!(this.find(node.data))) {
            throw new Error('Node not found')
        }
        const depths = new Set();
        // Traverse tree using node as starting point
        this.levelOrder((current) => {
            depths.add(this.depth(current)) 
            // Calculate all depths of all nodes until an end (leaf node) is reached
        }, node)
        // Return the maximum depth calculated (longest path from node to a leaf)
        return depths.size
    }
    isBalanced() {
        const root = this.root;
        if ( Math.abs( this.height(root.left) - this.height(root.right) ) <= 1 ) {
            return true;
        }
        return false;
    }
    rebalance() {
        const arr = this.inOrder();
        this.root = this.buildTree(sortArray(arr));
    }
}

export { Node, Tree, sortArray }