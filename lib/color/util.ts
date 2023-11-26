import { decode, encode } from "@msgpack/msgpack";
import { naturalColorSort, parseHSL } from "./color";
import { ColorScores, ColorScoreValue } from "./type";

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


const serializationPrefix = 'colorchooser//';

export const serializeScores = (scores: ColorScores): string => {
  // use msgpack:
  const smaller = scores.scores.map(({ color, score }) => {
    const {
      h,
      s,
      l,
    } = parseHSL(color);
    return [
      score, h, s, l,
    ]
  });
  const encoded = encode(smaller);
  return `${serializationPrefix}${Buffer.from(encoded).toString('base64')}`;
};

export const deserializeScores = (serializedScores: string): ColorScores => {
  if (!serializedScores.startsWith(serializationPrefix)) {
    throw new Error(`Invalid serialized scores: ${serializedScores}`);
  }
  const withoutPrefix = serializedScores.slice(serializationPrefix.length);
  const msgpacked = Buffer.from(withoutPrefix, 'base64');
  const scores = decode(msgpacked) as [ColorScoreValue, number, number, number][];
  return {
    order: 'historical',
    scores: scores.map(([score, h, s, l]) => ({
      color: `hsl(${h}, ${s}%, ${l}%)`,
      score,
    })),
  };
};
