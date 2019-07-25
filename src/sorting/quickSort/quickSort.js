/*
Quicksort is an efficient and commonly used sorting algorithm. It is a divide
and conquer algorithm.

1. choose a pivot element (could be middle element, or often median of first, 
  last, and middle elements - ideally a something in the middle of the sort)
2. Partitioning: move all elements less than the pivot before the pivot,
  all elements greater than the pivot after the pivot.
3. Recursively apply steps 1-2 to the two subarrays
When the subarray is size 1 or 0, it is sorted.

Average time complexity: O(n log n)
Worst case complexity: O(n^2)

algorithm quicksort(A, lo, hi) is
    if lo < hi then
        p := partition(A, lo, hi)
        quicksort(A, lo, p - 1)
        quicksort(A, p + 1, hi)

algorithm partition(A, lo, hi) is
    pivot := A[hi]
    i := lo
    for j := lo to hi - 1 do
        if A[j] < pivot then
            swap A[i] with A[j]
            i := i + 1
    swap A[i] with A[hi]
    return i
Sorting the entire array is accomplished by quicksort(A, 0, length(A) - 1).

*/

export function quickSort(input = [], lo = 0, hi = input.length - 1) {
  debugger;
  if (lo >= hi) return input;

  const pivot = input[hi]; // choosing last element in the array as pivot
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (input[j] < pivot) {
      [input[i], input[j]] = [input[j], input[i]];
      i++;
    }
  }
  [input[i], input[hi]] = [input[hi], input[i]];
  const p = i;

  quickSort(input, lo, p - 1);
  quickSort(input, p + 1, hi);
}
