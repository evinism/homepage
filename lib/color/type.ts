
export type ColorScoreValue = -2 | -1 | 0 | 1 | 2;

export interface ColorChoice {
  color: string;
  score: ColorScoreValue;
}

export type ColorChoices = ColorChoice[];

export type LegacyColorScores = {
  [color: string]: ColorScoreValue;
};