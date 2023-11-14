import { naturalColorSort } from "./color";
import { ColorScores } from "./type";

export const toNaturalSort = (colorScores: ColorScores<'historical'>): ColorScores<'natural'> => {
  const newScores = {
    order: 'natural' as const,
    scores: colorScores.scores.slice().sort(({ color: a }, { color: b }) => naturalColorSort(a, b)),
  };
  return newScores;
}

export const toColorsByScore = (colorScores: ColorScores) => {
  return toNaturalSort(colorScores).scores.reduce((acc: { [key: number]: string[] }, { color, score }) => {
    if (!acc[score]) {
      acc[score] = [];
    }
    acc[score].push(color);
    return acc;
  }, {} as { [key: number]: string[] });
}