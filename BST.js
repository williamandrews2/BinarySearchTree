class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
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

const arr = [1, 2, 3, 4, 5];
const tree = new Tree(arr);

const test = [8, 3, 14, 1, 6, 4, 7];
const testTree = new Tree(test);

// prettyPrint(testTree.root);
console.log(testTree.find(79));
