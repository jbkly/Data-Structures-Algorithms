import MinHeap from './MinHeap';

let unsortedArray = [5, 2, 7, 4, 0, 1];
let heap;

beforeEach(() => {
  heap = new MinHeap(unsortedArray);
});

describe('creating heap from unsorted array', () => {
  test('size', () => {
    expect(heap.size()).toBe(unsortedArray.length);
  });
  test('peek', () => {
    expect(heap.peek()).toBe(0);
  });
});

describe('insert', () => {
  beforeAll(() => {
    heap.insert(-5);
  });
  test('size after insert', () => {
    expect(heap.size()).toBe(7);
  });
  test('top after insert', () => {
    expect(heap.peek()).toBe(-5);
  });
});

describe('pop', () => {
  let result;
  beforeAll(() => {
    result = heap.pop();
  });
  test('pop result', () => {
    expect(result).toBe(-5);
  });
  test('size after pop', () => {
    expect(heap.size()).toBe(6);
  });
  test('top after pop', () => {
    expect(heap.peek()).toBe(0);
  });
  test('repeated pops', () => {
    expect(heap.pop()).toBe(0);
    expect(heap.pop()).toBe(1);
    expect(heap.pop()).toBe(2);
    expect(heap.pop()).toBe(4);
    expect(heap.pop()).toBe(5);
    expect(heap.pop()).toBe(7);
    expect(heap.size()).toBe(0);
    expect(heap.pop()).toBe(null);
  });
});

describe('insert multiple items to empty heap', () => {
  let heap;
  beforeAll(() => {
    heap = new MinHeap();
    heap.insertMultiple([5, 2, 7]);
  });
  test('after inserting multiple to empty heap', () => {
    expect(heap.size()).toBe(3);
    expect(heap.pop()).toBe(2);
    expect(heap.peek()).toBe(5);
    heap.insert(12);
    expect(heap.pop()).toBe(5);
    heap.insert(-100);
    expect(heap.pop()).toBe(-100);
    expect(heap.pop()).toBe(7);
    expect(heap.pop()).toBe(12);
    expect(heap.size()).toBe(0);
    expect(heap.pop()).toBe(null);
  });
});

describe('insert multiple to existing heap', () => {
  let heap;
  beforeAll(() => {
    heap = new MinHeap([3, -3, 0]);
    heap.insertMultiple([0, -10, -20]);
  });
  test('after insert multiple to existing', () => {
    expect(heap.size()).toBe(6);
    expect(heap.pop()).toBe(-20);
    expect(heap.pop()).toBe(-10);
    expect(heap.pop()).toBe(-3);
    expect(heap.pop()).toBe(0);
    expect(heap.pop()).toBe(0);
    expect(heap.pop()).toBe(3);
    expect(heap.pop()).toBe(null);
  });
});
