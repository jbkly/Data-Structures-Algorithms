import binarySearchTree, { TreeNode } from './binarySearchTree';

// recursive check
function isBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true; // an empty tree is a valid BST

  // keep track of contracting constraints as you traverse down each subtree
  // disallowing equality disallows duplicate nodes (store dupes on one node instead)
  if (node.data <= min || node.data >= max) return false;

  // left and right subtrees must also satisfy binary search property
  return isBST(node.left, min, node.data) && isBST(node.right, node.data, max);
}

let bst;
const inputValues = [5, 1, 4, 4, 0, 2, 3, 6, -1];

beforeEach(() => {
  bst = new binarySearchTree(inputValues);
});

describe('is a binary search tree', () => {
  test('satisfies binary search property recursively', () => {
    const rootNode = bst.getRoot();
    expect(isBST(rootNode)).toBe(true);
  });

  test('inorder traversal is sorted', () => {
    const result = bst.traverseInorder();
    for (let i = 0, j = 1; j < result.length; i++, j++) {
      if (j < result.length) {
        expect(result[i] <= result[j]).toBe(true);
      }
    }
  });
});

describe('find', () => {
  test('should find elements', () => {
    const result = bst.find(3);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(TreeNode);
    expect(result.data).toBe(3);
  });

  test('should return null if element not in bst', () => {
    const result = bst.find(9999);
    expect(result).toBeNull();
  });
});

describe('insert', () => {
  test('should insert element', () => {
    expect(bst.find(12)).toBeNull();
    bst.insert(12);
    const result = bst.find(12);
    expect(result).toBeInstanceOf(TreeNode);
    expect(result.data).toBe(12);
  });
});

describe('remove', () => {
  test('should delete element', () => {
    expect(bst.find(5)).toBeTruthy();
    bst.remove(5);
    expect(bst.find(5)).toBeFalsy();
  });
});

describe('duplicates', () => {
  test('inserting duplicate should increment count at node', () => {
    expect(bst.find(4).count).toBe(2);
    bst.insert(4);
    expect(bst.find(4).count).toBe(3);
  });

  test('removing duplicate should decrement count at node', () => {
    expect(bst.find(4).count).toBe(2);
    bst.remove(4);
    expect(bst.find(4).count).toBe(1);
  });
});

describe('traverse', () => {
  test('should do inorder traversal', () => {
    const result = bst.traverseInorder();
    expect(result).toEqual([...inputValues].sort((a, b) => a - b));
  });

  // only valid if we don't rebalance the tree
  // preorder is useful for copying a tree
  test('should do preorder traversal', () => {
    const result = bst.traversePreorder();
    expect(result).toEqual([5, 1, 0, -1, 4, 4, 2, 3, 6]);
  });

  // only valid if we don't rebalance the tree
  // postorder is useful for deleting a tree
  test('should do postorder traversal', () => {
    const result = bst.traversePostorder();
    expect(result).toEqual([-1, 0, 3, 2, 4, 4, 1, 6, 5]);
  });
});

describe('minimum element', () => {
  test('should find min element', () => {
    const result = bst.findMin();
    expect(result).toBeDefined();
    expect(result.data).toBe(-1);
  });

  test('should delete min element', () => {
    expect(bst.findMin()).toBe(bst.find(-1));
    bst.deleteMin();
    expect(bst.findMin()).not.toBe(bst.find(-1));
    expect(bst.find(-1)).toBeNull;
  });
});

describe('maximum element', () => {
  test('should find max element', () => {
    const result = bst.findMax();
    expect(result).toBeDefined();
    expect(result.data).toBe(6);
  });

  test('should delete max element', () => {
    expect(bst.findMax()).toBe(bst.find(6));
    bst.deleteMax();
    expect(bst.findMax()).not.toBe(bst.find(6));
    expect(bst.find(6)).toBeNull;
  });
});