import * as fibFunctions from './fibonacci';

/*
Fibonacci sequence, starts with 0, 1, each number is the sum of the preceding two 
0, 1, 1, 2, 3, 5, 8, 13, 21, etc

given a number n >= 0, return the nth fibonacci number
e.g. n = 2 -> 1
     n = 7 -> 13
*/
const expectations = new Map([
  [0, 0],
  [1, 1],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 5],
  [6, 8],
  [7, 13],
  [8, 21],
  [12, 144],
  [17, 1597],
  [25, 75025],
  [30, 832040],
  [40, 102334155],
  // beyond 40, the naive recursive implemenation gets really slow
]);

Object.values(fibFunctions).forEach(fn => {
  describe(fn.name, () => {
    expectations.forEach((result, input) => {
      test(`${fn.name}, n = ${input}`, () => {
        expect(fn(input)).toBe(result);
      });
    });
  });
});