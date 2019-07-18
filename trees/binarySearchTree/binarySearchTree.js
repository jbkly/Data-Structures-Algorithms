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

// Tree Node class
export class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.count = 1;
  }
}

// Binary Search tree class
export default class BinarySearchTree 
{ 
  constructor() 
  { 
      // root of a binary seach tree 
      this.root = null; 
  } 

  // function to be implemented 
  // insert(data) 
  // remove(data) 
                

  // Helper function 
  // findMinNode() 
  // getRootNode() 
  // inorder(node) 
  // preorder(node)                
  // postorder(node) 
  // search(node, data) 
} 