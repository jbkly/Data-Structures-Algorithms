/*
Bubble sort, also called sinking sort, is a simple sorting algorithm in which
elements "bubble" toward their correct place in the list through successive
passes. It's not a very efficient algorithm for most cases, unless the input is
already mostly sorted with just a few elements slightly out of place.

Time complexity: O(n^2) average, optimized version can be O(n)
Space complexity: O(1)

*/
export function basicBubbleSort(input = []) {
  for (let i = 1; i < input.length; i++) {
    for (let j = input.length - 1; j >= i; j--) {
      // if elements are out of order
      if (input[j - 1] > input[j]) {
        // swap the two elements
        [input[j], input[j - 1]] = [input[j - 1], input[j]];
      }
    }
  }
  return input;
}

// optimization: keep track if you've done a swap this pass. If you do a complete
// pass without a swap, then the array is sorted
export function bubbleSortTrackSwap(input = []) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < input.length; i++) {
      if (input[i] > input[i + 1]) {
        [input[i], input[i + 1]] = [input[i + 1], input[i]];
        swapped = true;
      }
    }
  } while (swapped);
  return input;
}

// optimization: with each pass one more element of the array is sorted,
// so you can reduce the length of future passes by one
export function reducingBubbleSort(input = []) {
  let length = input.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < length; i++) {
      if (input[i] > input[i + 1]) {
        [input[i], input[i + 1]] = [input[i + 1], input[i]];
        swapped = true;
      }
    }
    length--;
  } while (swapped);
  return input;
}

// further optimization: anything past the last swap is sorted and can be
// excluded from future passes
export function optimizedBubbleSort(input = []) {
  let length = input.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < length; i++) {
      if (input[i] > input[i + 1]) {
        [input[i], input[i + 1]] = [input[i + 1], input[i]];
        swapped = true;
      }
    }
    length--;
  } while (swapped);
  return input;
}

export default optimizedBubbleSort;
