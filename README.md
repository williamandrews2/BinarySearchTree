# 🌲 Binary Search Tree Project

Welcome to my **Binary Search Tree (BST)** project! This was built as part of the [JavaScript - Binary Search Trees lesson](https://www.theodinproject.com/lessons/javascript-binary-search-trees) from [The Odin Project](https://www.theodinproject.com/).

📚 This project demonstrates how to build a balanced binary search tree from an array, and provides utility methods like traversal, insertion, deletion, rebalancing, and balance checks — all in vanilla JavaScript.

---

## 🚀 Features

✅ Create a balanced binary search tree from a sorted array  
✅ Traverse the tree using:
- Level-order (breadth-first)
- In-order
- Pre-order
- Post-order  

✅ Insert and delete nodes  
✅ Check if the tree is balanced  
✅ Rebalance the tree  
✅ Calculate height and depth of nodes  

---

## 🛠️ Technologies Used

- JavaScript (ES6+)
- Node.js for testing (optional)
- No external libraries

---

## 📂 How to Use

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

2. Run it with Node (if you are testing in the terminal):

```bash
node index.js
```

3. Or import the `Tree` class into your own JS project:

```bash
import { Tree } from './BST.js';
```

## 📸 Example Output

```bash
const array = [34, 57, 61, 13, 93, 4];
const tree = new Tree(array);

tree.levelOrder(console.log);   // [34, 13, 57, 4, 61, 93]
tree.isBalanced();              // true

tree.insert(123);
tree.insert(142);
tree.insert(189);

tree.isBalanced();              // false
tree.rebalance();
tree.isBalanced();              // true

```
