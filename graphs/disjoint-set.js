/*
  A disjoint-set data structure (also called a union–find data structure or merge–find set)
  is a data structure that tracks a set of elements partitioned into a number of disjoint
  (non-overlapping) subsets. It provides near-constant-time operations (bounded by the
  inverse Ackermann function) to add new sets, to merge existing sets, and to determine
  whether elements are in the same set. In addition to many other uses, disjoint-sets
  play a key role in Kruskal's algorithm for finding the minimum spanning tree of a graph.

  Start with a set of n individual (unconnected) items. You get a series of connections
  (0-5, 2-3, 5-2, 6-9, etc). Each connection is merging two sets of 1 or more items. Use
  one item as the representative (root) item for each set. All the other items in the set
  have another item (ideally the root) as their parent; the root has itself as its parent.
  * Find: to see if two items are in the same set, you trace back up their parent items until
    you find their root items (the one whose parent is itself). If the two items have the same
    root, they are in the same set.
  * Union/Merge: to merge two sets, find their root items and set one as the parent of the other.
    Now the two sets are merged. 
    - naive implementation: just pick one to be the parent. But trees can get very tall this way,
      which makes find (tracing back to the root from a given node) slow.
  * Optimizations: Keep the tree flatter to speed up lookups. Ideally every member of the set would 
    point directly to the root as its parent, but to do that you have to loop through the whole set
    after every union to point each item to the new root. Too slow.
    - union by size: keep track of the size of each set. merge the smaller set into the larger.
    - union by rank: keep track of "rank" (~depth but not exactly due to compression) of each set,
      merge the lower-ranked set into the higher-ranked set. An individual item is rank 0. When
      doing a merge, if both sets have the same rank, the merged set is rank + 1. If one set is
      higher-ranked, that remains the rank of the merged set. 
    - path compression during find: while tracing up from a node to find its parent, reset items
      along the way to point to their grandparent. You don't have to worry about going too far
      because the parent of the root is itself. So each find is compressing the tree so that items
      point directly to their root or closer to it. 

    You can use arrays to track these values for n nodes:
    - parents: int array `id` of size n, value at `id[i]` is the parent of i
    - size: int array of size n, value at `size[i]` is the size of the set rooted at i
    - rank: same as size but for rank

    Resources:
    * https://en.wikipedia.org/wiki/Disjoint-set_data_structure
    * https://www.cs.princeton.edu/~rs/AlgsDS07/01UnionFind.pdf
    * https://algs4.cs.princeton.edu/15uf/
  */

export default class DisjointSet {
  /*
    @param: int n: number of items in the disjoint set
      each item starts out as a set of size 1, rank 0
  */
  constructor(n) {
    // item ids from 0-n
    this.id = [...Array(n).keys()];
    this.size = Array(n).fill(1);
    this.rank = Array(n).fill(0);
    this.setsCount = n;
    this.connectionsCount = 0;
  }
  root(i) {
    // the element whose id is itself is the root of the set
    while (i !== this.id[i]) {
      // perform path compression while tracing up to root
      // this keeps the tree flat, speeding up future lookups
      this.id[i] = this.id[this.id[i]];
      i = this.id[i];
    }
    return i;
  }
  isConnected(a, b) {
    return this.root(a) === this.root(b);
  }
  unite(a, b) {
    const rootA = this.root(a);
    const rootB = this.root(b);
    // if these two items are already connected, return
    if (rootA === rootB) return;

    /*
      Union by rank attaches the shorter tree to the root of the taller tree.
      To implement union by rank, each element is associated with a rank.
      Initially a set has one element and a rank of zero.
      If two sets are unioned and have the same rank, the resulting set's rank
      is one larger; otherwise, if two sets are unioned and have different ranks,
      the resulting set's rank is the larger of the two.
    */
    if (this.rank[rootA] >= this.rank[rootB]) {
      this.id[rootB] = rootA;
      if (this.rank[rootA] === this.rank[rootB]) {
        this.rank[rootA]++;
      }
    } else {
      this.id[rootA] = rootB;
    }
    this.connectionsCount++; // one connection was made to join an item to a set
    this.setsCount--; // one isolated item joined a set
  }
}