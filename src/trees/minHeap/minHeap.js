/*
  A binary heap is a heap data structure that takes the form of a binary tree.
  Binary heaps are a common way of implementing priority queues.
  A binary heap is a binary tree with 2 properties:
  1. a complete binary tree - all levels are filled from left to right except last
  2. every node is greater than/equal to all its children (max-heap)
    or less than/equal to all its children (min-heap)
  
  A min-heap's root/top element is always the smallest, a max-heap's is largest

  Both insert and remove add/remove to the end of the heap first, then heapify to
  restore the heap property. This takes at worst O(log n) time.

  insert:
  1. add item to the last position
  2. heapify up - compare item to its parent and swap if necessary, repeat

  remove:
  1. remove top item
  2. move last item to top position
  3. heapify down - while item is higher than either child, swap with smallest child

  building a heap:
  - can do it by starting with empty heap and inserting one by one - O(n log n)
  - faster: add all unsorted items, then heapify down each level starting from
    the bottom up

  You can use an array to represent the complete binary tree.
  index 0 is the root. For each element at index i,
  its children are at indices 2i + 1 and 2i + 2
  its parent is at index Math.floor((i − 1) ∕ 2)

  Resource:
  * https://en.wikipedia.org/wiki/Binary_heap
*/

export default class minHeap {
  /*
    Expects array of integers
  */
  constructor(unsortedArray = []) {
    this.heap = unsortedArray;
    this.minHeapify();
  }
  peek() {
    // return (but don't remove) the top (min) item
    return this.heap.length ? this.heap[0] : null;
  }
  insert(item) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
    return this;
  }
  insertMultiple(unsortedArray) {
    this.heap.push(...unsortedArray);
    this.minHeapify();
    return this;
  }
  size() {
    return this.heap.length;
  }
  pop() {
    // remove and return the top (min) item
    if (!this.size()) return null;
    if (this.size() === 1) return this.heap.pop();
    const topItem = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return topItem;
  }
  last() {
    if (!this.heap.length) return null;
    return this.heap[this.heap.length - 1];
  }
  swap(i1, i2) {
    // swap two nodes
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  heapifyUp(startIndex) {
    // (heapify up:) while item is smaller value than parent, swap with parent
    let i = startIndex || this.heap.length - 1;
    // const node = ;
    while (this.hasParent(i) && this.heap[i] < this.parent(i)) {
      let parentIndex = this.getParentIndex(i);
      this.swap(i, parentIndex);
      i = parentIndex;
    }
  }
  heapifyDown(startIndex = 0) {
    // while item is higher value than either child, swap it with smallest child
    let i = startIndex;
    // const node = this.heap[i];

    while (
      (this.hasLeftChild(i) && this.heap[i] > this.leftChild(i)) ||
      (this.hasRightChild(i) && this.heap[i] > this.rightChild(i))
    ) {
      let childIndex = this.getMinChildIndex(i);
      this.swap(i, childIndex);
      i = childIndex;
    }
  }
  minHeapify() {
    const startIndex = Math.floor((this.heap.length - 1) / 2);
    for (let i = startIndex; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
  getMinChildIndex(i) {
    let leftChild = !this.hasLeftChild(i) ? Infinity : this.leftChild(i);
    let rightChild = !this.hasRightChild(i) ? Infinity : this.rightChild(i);
    return leftChild > rightChild
      ? this.getRightChildIndex(i)
      : this.getLeftChildIndex(i);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  hasLeftChild(i) {
    return this.getLeftChildIndex(i) < this.heap.length;
  }
  hasRightChild(i) {
    return this.getRightChildIndex(i) < this.heap.length;
  }
  leftChild(i) {
    return this.heap[this.getLeftChildIndex(i)];
  }
  rightChild(i) {
    return this.heap[this.getRightChildIndex(i)];
  }
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  hasParent(i) {
    return this.getParentIndex(i) >= 0;
  }
  parent(i) {
    return this.heap[this.getParentIndex(i)];
  }
}
