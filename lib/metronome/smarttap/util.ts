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
