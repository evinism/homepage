
export type ColorScoreValue = -2 | -1 | 0 | 1 | 2;

export interface ColorScore {
  color: string;
  score: ColorScoreValue;
}

export interface ColorScores<T extends 'historical' | 'natural' = 'historical'> {
  order: T,
  scores: ColorScore[];
}

export type LegacyColorScores = {
  [color: string]: ColorScoreValue;
};