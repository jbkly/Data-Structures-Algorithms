/*
Binary Search Tree

Each node is greater than any node in the left sub-tree,
and less than any node in the right sub-tree.

BSTs can allow duplicates or not. If you allow duplicates, the easier way is to
keep a count at that node rather than having dupe nodes with the same key

Complexity	Average	  Worst case
Space		    O(n)	    O(n)
Search		  O(log n)	O(n)
Insert		  O(log n)	O(n)
Delete		  O(log n)	O(n)
*/

export class Node {
  constructor(data, parent = null) {
    this.data = data;
    this.parent = parent; // storing parent makes node removal simpler
    this.left = null;
    this.right = null;
    this.count = 1;
  }
}

export default class BinarySearchTree {
  constructor(elements = []) {
    this.root = null;
    for (const item of elements) {
      this.insert(item);
    }
  }
  find(data, node = this.root) {
    if (!node || node.data === data) return node;
    if (data < node.data) return this.find(data, node.left);
    return this.find(data, node.right);
  }
  insert(data) {
    if (!this.root) {
      this.root = new Node(data);
    } else {
      if (typeof data !== typeof this.root.data) {
        throw 'Can only add items of the same type to the binary search tree';
      }
      insertUtil(data, this.root);
    }
  }
  remove(data, node = this.find(data)) {
    if (!node) return false;
    if (--node.count > 0) return true; // if multiple, just decrement

    if (node.left && node.right) {
      // if node to be deleted has two children
      // get the inorder successor or predecessor
      // randomly choose successor or predecessor to keep tree flatter
      const replacement =
        Math.random() < 0.5
          ? findMaxInSubTree(node.left)
          : findMinInSubTree(node.right);
      node.data = replacement.data;
      this.remove(replacement.data, replacement);
    } else if (node.left) {
      // if only one child, replace self with child
      replaceInParent(node, node.left);
    } else if (node.right) {
      replaceInParent(node, node.right);
    } else {
      // if no child nodes, just remove and point parent to null
      replaceInParent(node, null);
    }
  }
  // inorder traversal returns the sorted values
  traverseInorder(node = this.root, array = []) {
    if (!node) return array;
    this.traverseInorder(node.left, array);
    for (let i = 0; i < node.count; i++) {
      array.push(node.data);
    }
    this.traverseInorder(node.right, array);
    return array;
  }
  // preorder traversal is useful for copying a tree
  traversePreorder(node = this.root, array = []) {
    if (!node) return array;
    for (let i = 0; i < node.count; i++) {
      array.push(node.data);
    }
    this.traversePreorder(node.left, array);
    this.traversePreorder(node.right, array);
    return array;
  }
  // postorder traversal is useful for deleting a tree
  traversePostorder(node = this.root, array = []) {
    if (!node) return array;
    this.traversePostorder(node.left, array);
    this.traversePostorder(node.right, array);
    for (let i = 0; i < node.count; i++) {
      array.push(node.data);
    }
    return array;
  }
  findMin() {
    return findMinInSubTree(this.root);
  }
  findMax() {
    return findMaxInSubTree(this.root);
  }
  deleteMin() {
    const minNode = this.findMin();
    this.remove(minNode.data, minNode);
  }
  deleteMax() {
    const maxNode = this.findMax();
    this.remove(maxNode.data, maxNode);
  }
}

// "private" helpers
function insertUtil(data, node) {
  if (data < node.data) {
    if (!node.left) {
      node.left = new Node(data, node);
    } else {
      insertUtil(data, node.left);
    }
  } else if (data > node.data) {
    if (!node.right) {
      node.right = new Node(data, node);
    } else {
      insertUtil(data, node.right);
    }
  } else {
    node.count++;
  }
}

function findMinInSubTree(node) {
  while (node.left) node = node.left;
  return node;
}

function findMaxInSubTree(node) {
  while (node.right) node = node.right;
  return node;
}

function replaceInParent(node, child) {
  if (node.parent) {
    if (node === node.parent.left) {
      node.parent.left = child;
    } else {
      node.parent.right = child;
    }
  }
  if (child) child.parent = node.parent;
}
