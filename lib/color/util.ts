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


export const serializationPrefix = 'color.palette.';

export const serializeScores = (scores: ColorScores, name: string): string => {
  // use msgpack:
  const value = scores.scores.map(({ color, score }) => {
    const {
      h,
      s,
      l,
    } = parseHSL(color);
    return [
      score, h, s, l,
    ]
  });
  const encoded = encode({
    key: name,
    value
  });
  return `${serializationPrefix}${Buffer.from(encoded).toString('base64')}`;
};

export const deserializeScores = (serializedScores: string): { key: string, value: ColorScores } => {
  if (!serializedScores.startsWith(serializationPrefix)) {
    throw new Error(`Invalid serialized scores: ${serializedScores}`);
  }
  const withoutPrefix = serializedScores.slice(serializationPrefix.length);
  const msgpacked = Buffer.from(withoutPrefix, 'base64');
  const {
    key, value
  } = decode(msgpacked) as { key: string, value: [ColorScoreValue, number, number, number][] };
  return {
    key,
    value: {
      order: 'historical',
      scores: value.map(([score, h, s, l]) => ({
        color: `hsl(${h}, ${s}%, ${l}%)`,
        score,
      })),
    }
  };
};

export const chooseNewName = (existingNames: string[], name: string): string => {
  if (!existingNames.includes(name)) {
    return name;
  }
  // format is "name" for the first one, "name (1)" for the second, "name (2)" for the third, etc.
  let newName = name;
  while (existingNames.includes(newName)) {
    newName = incrementName(newName);
  }
  return newName;
};

const incrementName = (name: string): string => {
  const match = name.match(/^(.*) \((\d+)\)$/);
  if (!match) {
    return `${name} (1)`;
  }
  const [, prefix, number] = match;
  return `${prefix} (${parseInt(number) + 1})`;
}
