class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    return this.items.isEmpty() ? "Queue is empty!" : this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class Tree {
  constructor(values) {
    this.values = values;
    this.root = this.#buildTree(this.#sortArray(values));
  }

  #sortArray(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  #buildTree(array) {
    if (array.length === 0) return null;
    if (array.length === 1) return new Node(array[0]);

    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);

    root.left = this.#buildTree(left);
    root.right = this.#buildTree(right);

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (value === root.data) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    // base case
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      // when/if we find a match
      // node has zero children
      if (root.left === null && root.right === null) {
        return null;
      }
      // node has only a right child
      if (root.left === null) {
        return root.right;
      }
      // node has only a left child
      if (root.right === null) {
        return root.left;
      }
      // node has two children that are NOT null
      // set the new "root" to be the smallest node in the right subtree (the successor)
      let tempNode = root.right;

      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }
      root.data = tempNode.data;

      // delete the successor from the right subtree since it has been reassigned to the root
      root.right = this.deleteItem(tempNode.data, root.right);
    }
    return root;
  }

  find(value, root = this.root) {
    if (root === null || root.data === value) {
      return root;
    }
    if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    }
  }

  height(value) {
    let node = this.find(value);
    if (!node) return null; // node is not in the tree

    function calculateSubtreeHeight(node) {
      if (!node) return -1;
      const leftHeight = calculateSubtreeHeight(node.left);
      const rightHeight = calculateSubtreeHeight(node.right);
      const result = Math.max(leftHeight, rightHeight) + 1;
      return result;
    }

    const height = calculateSubtreeHeight(node);
    return height;
  }

  depth(value, root = this.root, count = 0) {
    if (!root) {
      return null;
    }
    if (root.data === value) {
      return count;
    }
    if (value < root.data) {
      count++;
      return this.depth(value, root.left, count);
    } else if (value > root.data) {
      count++;
      return this.depth(value, root.right, count);
    }
    return null;
  }

  isBalanced() {
    return this.isBalancedRecursive(this.root) > 0;
  }

  isBalancedRecursive(root) {
    if (root === null) return 0;

    const leftHeight = this.isBalancedRecursive(root.left);
    const rightHeight = this.isBalancedRecursive(root.right);

    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    )
      return -1;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    let sorted = [];
    // pass in helper function as the callback variable for the levelOrder function
    this.inOrder((array) => {
      sorted = this.#sortArray(array);
    });
    // rebuild the tree by assigning root
    this.root = this.#buildTree(sorted);
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    if (this.root === null) return null;

    let q = new Queue();
    let result = [];
    q.enqueue(this.root);

    while (!q.isEmpty()) {
      let node = q.dequeue();
      result.push(node.data);
      if (node.left !== null) {
        q.enqueue(node.left);
      }
      if (node.right !== null) {
        q.enqueue(node.right);
      }
    }

    callback(result);
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function inOrderRecursive(root, result = []) {
      if (root) {
        inOrderRecursive(root.left, result);
        result.push(root.data);
        inOrderRecursive(root.right, result);
      }
      return result;
    }

    callback(inOrderRecursive(this.root));
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function preOrderRecursive(root, result = []) {
      if (root) {
        result.push(root.data);
        preOrderRecursive(root.left, result);
        preOrderRecursive(root.right, result);
      }
      return result;
    }

    callback(preOrderRecursive(this.root));
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }

    function postOrderRecursive(root, result = []) {
      if (root) {
        postOrderRecursive(root.left, result);
        postOrderRecursive(root.right, result);
        result.push(root.data);
      }
      return result;
    }

    callback(postOrderRecursive(this.root));
  }
}

function printValues(values) {
  console.log(values); // print the array of values
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const test = [8, 3, 14, 1, 6, 4, 7];
const testTree = new Tree(test);
