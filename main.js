import { Tree } from "./BST.js";

function printValues(array) {
  console.log(array);
}

const array = [34, 57, 61, 13, 93, 4];
const tree = new Tree(array);

console.log(tree.isBalanced());

tree.levelOrder(printValues);
tree.preOrder(printValues);
tree.postOrder(printValues);
tree.inOrder(printValues);

tree.insert(123);
tree.insert(142);
tree.insert(189);
tree.insert(166);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

tree.levelOrder(printValues);
tree.preOrder(printValues);
tree.postOrder(printValues);
tree.inOrder(printValues);
