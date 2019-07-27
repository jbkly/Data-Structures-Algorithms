import * as bubbleSortFunctions from './bubbleSort';
import * as quickSortFunctions from './quickSort';

const testCases = [
  {
    input: [-1, 1, 3, -4, 2, 8, -3, 6, 9, -5, 0, -2, 4, 7, 5],
    expected: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    input: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5],
    expected: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    input: [],
    expected: [],
  },
  {
    input: [0],
    expected: [0],
  },
  {
    input: [1],
    expected: [1],
  },
  {
    input: [1, 1, 1, 1],
    expected: [1, 1, 1, 1],
  },
  {
    input: [-1, -1, -1, -1],
    expected: [-1, -1, -1, -1],
  },
];

const testAllFunctions = sortFunctionsObj => {
  Object.values(sortFunctionsObj).forEach(sortFunction => {
    test(`${sortFunction.name} should sort the unsorted array`, () => {
      testCases.forEach(testCase => {
        const input = [...testCase.input]; // clone to avoid mutation
        expect(sortFunction(input)).toEqual(testCase.expected);
      });
    });
  });
};

describe('Bubble sort', () => {
  testAllFunctions(bubbleSortFunctions);
});

describe('Quicksort', () => {
  testAllFunctions(quickSortFunctions);
});
