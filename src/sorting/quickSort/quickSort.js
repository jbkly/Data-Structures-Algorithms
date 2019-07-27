/*
Quicksort is an efficient and commonly used sorting algorithm.
It is a recursive divide and conquer algorithm.

1. choose a pivot element (could be middle element, or often median of first, 
  last, and middle elements - ideally a something in the middle of the sort)
2. Partitioning: move all elements less than the pivot before the pivot,
  all elements greater than the pivot after the pivot.
3. Recursively apply steps 1-2 to the two subarrays
When the subarray is size 1 or 0, it is sorted.

Average time complexity: O(n log n)
Worst case complexity: O(n^2)

*/

// sorts IN-PLACE: mutates the input array
export function quickSort1(input = [], low = 0, high = input.length - 1) {
  if (low >= high) return input;

  const partitionIndex = partition1(input, low, high);

  quickSort1(input, low, partitionIndex - 1);
  quickSort1(input, partitionIndex + 1, high);

  return input;
}

function partition1(arr, low, high) {
  // choose pivot - in this case last element of the range
  const pivot = arr[high];
  let partitionIndex = low;
  // go through every element in the current range
  // move smaller elements to the front, leave greater/equal elements
  // then move pivot to the spot in between
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[partitionIndex], arr[j]] = [arr[j], arr[partitionIndex]];
      partitionIndex++;
    }
  }
  [arr[partitionIndex], arr[high]] = [arr[high], arr[partitionIndex]];
  return partitionIndex;
}
// the downside of picking the last element as the pivot:
// if the array is already sorted, it degrades to O(n^2)

// An optimization is to choose pivot by taking median of low, high, middle
export function quickSort2(input = [], low = 0, high = input.length - 1) {
  if (low >= high) return input;

  const partitionIndex = partition2(input, low, high);

  quickSort2(input, low, partitionIndex - 1);
  quickSort2(input, partitionIndex + 1, high);

  return input;
}

function partition2(arr, low, high) {
  // choose pivot - in this case the median of low, high, and middle
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] < arr[low]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
  if (arr[high] < arr[low]) [arr[low], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] < arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
  const pivot = arr[high];

  let partitionIndex = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[partitionIndex], arr[j]] = [arr[j], arr[partitionIndex]];
      partitionIndex++;
    }
  }
  [arr[partitionIndex], arr[high]] = [arr[high], arr[partitionIndex]];
  return partitionIndex;
}

/* 
If there are duplicate items in the array, some swaps may be unnecessary.
We can further optimize by keeping track of three subarrays:
lower, higher, and equal to pivot.
This version uses extra arrays to make it easier to follow, at the cost
of additional space.
*/
export function quickSort3(input = []) {
  if (input.length <= 1) return input;

  const [left, right, middle] = partition3(input);

  const sortedLeft = quickSort3(left);
  const sortedRight = quickSort3(right);

  return [...sortedLeft, ...middle, ...sortedRight];
}

function partition3(arr) {
  const left = [];
  const right = [];
  const middle = [];

  // choose random pivot
  const pivot = arr[Math.floor(Math.random() * arr.length)];

  while (arr.length) {
    const item = arr.pop();
    (item < pivot ? left : item > pivot ? right : middle).push(item);
  }

  return [left, right, middle];
}

/*
Another optimization:
When the number of elements is below some threshold (perhaps ten elements),
switch to a non-recursive sorting algorithm such as insertion sort that performs
fewer swaps on such small arrays.
*/
