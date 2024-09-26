// For Summary
export const getMean = (array: number[]) => {
  return array.reduce((a, b) => a + b, 0) / array.length;
};

export const getVariance = (array: number[]) => {
  const mean = getMean(array);
  const errors = array.map(function (num) {
    return Math.pow(num - mean, 2);
  });
  return errors.reduce((a, b) => a + b, 0) / (errors.length - 1);
};

export const sum = (array: number[]) => {
  return array.reduce((a, b) => a + b, 0);
};

export const maxBy = <T>(arr: T[], fn: (t: T) => number): T => {
  return arr.reduce((a, b) => (fn(a) > fn(b) ? a : b));
};

export const transpose = <T>(matrix: T[][]) => {
  let transposed = Array(matrix[0].length)
    .fill(undefined)
    .map(() => []);
  for (let cycle of matrix) {
    for (let i = 0; i < cycle.length; i++) {
      transposed[i].push(cycle[i]);
    }
  }
  return transposed as T[][];
};

export const getMedian = (array: number[]) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
};

// And for multiarrays
export function multiLength(arr: unknown[][]) {
  return arr.reduce((acc, val) => acc + val.length, 0);
}

export function toSplitIndex<T>(arr: T[][], index: number): [number, number] {
  let i = 0;
  while (index >= arr[i].length) {
    index -= arr[i].length;
    i++;
  }
  return [i, index];
}

export function multiIndex<T>(arr: T[][], index: number): T {
  const [i, j] = toSplitIndex(arr, index);
  return arr[i][j];
}

export const setAtIndex = <T>(arr: T[], index: number, value: T) => {
  return arr.map((el, i) => (i === index ? value : el));
};
