import binarySearchTree from './binarySearchTree';

// recursive check
function isBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true; // an empty tree is a valid BST

  // keep track of contracting constraints as you traverse down each subtree
  if (node.data < min || node.data > max) return false;

  // left and right subtrees must also satisfy binary search property
  return isBST(node.left, min, node.data) && isBST(node.right, node.data, max);
}

let bst;

describe('is a binary search tree', () => {
  beforeEach(() => {
    bst = new binarySearchTree([5, 1, 4, 0, 2, 3, 6, -1]);
  });

  test('satisfies binary search property recursively', () => {
    expect(isBST(bst.getRoot())).toBe(true);
  });

  test('inorder traversal is sorted', () => {
    const inorderTraversal = bst.traverseInorder();
    for (let i = 0, j = 1; j < inorderTraversal.length; i++, j++) {
      if (j < inorderTraversal.length) {
        expect(i <= j).toBe(true);
      }
    }
  });
});

describe('find', () => {
  test.todo('should find element');
});

describe('insert', () => {
  test.todo('should insert element');
});

describe('delete', () => {
  test.todo('should delete element');
});

describe('traverse', () => {
  test.todo('should do inorder traversal');

  test.todo('should do preorder traversal');

  test.todo('should do postorder traversal');
});

describe('find min', () => {
  test.todo('should find min element');
});

describe('delete min', () => {
  test.todo('should delete min element');
});

describe('find max', () => {
  test.todo('should find max element');
});

describe('delete max', () => {
  test.todo('should delete max element');
});