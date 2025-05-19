class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array, root) {
    this.array = array;
    this.root = root;
  }
}

function buildTree(array) {
  let sorted = arr.filter((item, index) => arr.indexOf(item) === index).sort();
  let nodes = sorted.map((num) => new Node(num));
  return balance(nodes);
}

function balance(array) {
  if (array.length === 0) return null;
  if (array.length === 1) return array[0];

  let mid = Math.floor(array.length / 2);
  let root = new Node(array[mid]);

  let left = array.slice(0, mid);
  let right = array.slice(mid + 1);

  root.left = balance(left);
  root.right = balance(right);

  return root;
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
const root = buildTree(arr);
prettyPrint(root);
