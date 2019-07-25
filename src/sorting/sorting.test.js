import * as bubbleSortFunctions from './bubbleSort';

const unsortedArray = [5, 2, -9, 5, 0, 0, 4, 67, -3, -11, 21];
const sortedArray = [-11, -9, -3, 0, 0, 2, 4, 5, 5, 21, 67];
const reversedArray = [67, 21, 5, 5, 4, 2, 0, 0, -3, -9, -11];

describe('Bubble sort', () => {
  Object.values(bubbleSortFunctions).forEach(bubbleSortFunction => {
    test(`${bubbleSortFunction.name} should sort the unsorted array`, () => {
      [unsortedArray, reversedArray].forEach(arr => {
        expect(bubbleSortFunction(arr)).toEqual(sortedArray);
      });
    });
  });
});
