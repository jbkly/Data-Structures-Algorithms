/*
Fibonacci sequence, starts with 0, 1, each number is the sum of the preceding two 
0, 1, 1, 2, 3, 5, 8, 13, 21, etc

given a number n, return the nth fibonacci number
e.g. n = 2 -> 1
     n = 7 -> 13
*/

// naive recursive
export function fibRecursiveNaive(n) {
  if (n < 2) return n;
  return fibRecursiveNaive(n - 1) + fibRecursiveNaive(n - 2);
}
// problems: call stack gets deep, lots repeated calculation of same fib value

// recursive with caching
export function fibRecursiveCache(n, solved = new Map()) {
  if (n < 2) return n;
  if (solved.has(n)) return solved.get(n);
  solved.set(n, fibRecursiveCache(n - 2, solved) + fibRecursiveCache(n - 1, solved));
  return solved.get(n);
}

// simple iterative
export function fibIterative(n) {
  const arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr[n];
} // problem: space complexity, do we need to keep all the steps in the array?

// iterative more space efficient - only keep the last two items in the series
export function fibIterative2(n) {
  if (n < 2) return n;
  let a = 0, b = 1, c;
  for (let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return c;
}

// using binet's formula:
// export function fibClosedForm(n) {
//   const sqrt5 = Math.sqrt(5);
// }