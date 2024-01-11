// Musical chord chart markup language
// This is a simple markup language for describing musical chord charts.

import dynamic from 'next/dynamic';
import { useState } from 'react';


interface Chart {
  title?: string;
  subtitle?: string;
  artist?: string;
  key?: string;
  time?: string;
  tempo?: string;
  composition?: Section[];
}

interface Section {
  name?: string;
  repeat?: number;
  blocks: Block[];
}

type Block = Measure[];

type Measure = Chord[];

type Chord = string;

/* Example:
G G Fm C / G G F G | x2 Verse
G Fm Fm D / G G Fm (D G) | x2 Chorus


/ denotes block
| denotes a section
() denotes a measure that contains more than one chord
*/

type Token = {
  type: 'chord',
  value: string
} | {
  type: 'bar' | 'slash' | 'newline' | 'open-paren' | 'close-paren',
} | {
  type: 'repeat',
  value: number
} | {
  type: 'label',
  value: string
}

const tokenize = (text: string): Token[] => {
  const tokens: Token[] = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    switch (char) {
      case '/':
        tokens.push({ type: 'slash' });
        break;
      case '|':
        tokens.push({ type: 'bar' });
        break;
      case '(':
        tokens.push({ type: 'open-paren' });
        break;
      case ')':
        tokens.push({ type: 'close-paren' });
        break;
      case '\n':
        tokens.push({ type: 'newline' });
        break;
      case ' ':
        break;
      default:
        if (char.match(/[A-G]/)) {
          let chord = char;
          while (text[i + 1] && text[i + 1].match(/([^\(\)\|\n\/\s])/)) {
            chord += text[i + 1];
            i++;
          }
          tokens.push({ type: 'chord', value: chord });
        } else if (char === 'x') {
          let repeat = '';
          while (text[i + 1] && text[i + 1].match(/\d/)) {
            repeat += text[i + 1];
            i++;
          }
          tokens.push({ type: 'repeat', value: parseInt(repeat) });
        } else {
          let label = '';
          while (text[i + 1] && text[i + 1].match(/([^\(\)\|\n\/\s])/)) {
            label += text[i + 1];
            i++;
          }
          tokens.push({ type: 'label', value: label });
        }
        break;
    }
  }
  return tokens;
}

type Parser<T,> = (tokens: Token[]) => [T, Token[]];


const parseMeasure: Parser<Measure> = (tokens) => {
  const firstToken = tokens[0];
  if (!firstToken) {
    throw new Error('Unexpected token');
  }
  const chords: Chord[] = [];
  if (firstToken.type === 'chord') {
    chords.push(firstToken.value);
    tokens = tokens.slice(1);
  } else if (firstToken.type === 'open-paren') {
    tokens = tokens.slice(1);
    while (tokens[0].type !== 'close-paren') {
      if (tokens[0].type === 'chord') {
        chords.push(tokens[0].value);
        tokens = tokens.slice(1);
      } else {
        throw new Error('Unexpected token');
      }
    }
    tokens = tokens.slice(1);
  } else {
    throw new Error('Unexpected token');
  }
  return [chords, tokens];
}


const parseBlock: Parser<Block> = (tokens) => {
  const firstToken = tokens[0];
  if (!firstToken || firstToken.type !== 'chord' && firstToken.type !== 'open-paren') {
    throw new Error('Unexpected token');
  }
  const measures: Measure[] = [];

  while (tokens.length && tokens[0].type !== 'slash' && tokens[0].type !== 'bar' && tokens[0].type !== 'newline') {
    let measure: Measure;
    [measure, tokens] = parseMeasure(tokens);
    measures.push(measure);
  }
  if (tokens.length && tokens[0].type === 'slash') {
    tokens = tokens.slice(1);
  }
  return [measures, tokens.slice(1)];
}

const parseSection = (tokens: Token[]): [Section, Token[]] => {
  const firstToken = tokens[0];
  if (!firstToken || firstToken.type !== 'chord' && firstToken.type !== 'open-paren') {
    throw new Error('Unexpected token');
  }
  const blocks: Block[] = [];
  while (tokens.length && tokens[0].type !== 'bar') {
    if (tokens[0].type === 'newline') {
      tokens = tokens.slice(1);
      continue;
    }
    let block: Block;
    [block, tokens] = parseBlock(tokens);
    blocks.push(block);
  }
  return [{ blocks }, tokens.slice(1)];

}

const parseComposition: Parser<Section[]> = (tokens) => {
  const firstToken = tokens[0];
  if (!firstToken) {
    return [[], tokens];
  }

  if (firstToken.type === 'newline') {
    return parseComposition(tokens.slice(1));
  } else if (firstToken.type === 'open-paren' || firstToken.type === 'chord') {
    const [section, rest] = parseSection(tokens);
    const [composition, rest2] = parseComposition(rest);
    return [[section, ...composition], rest2];
  } else {
    throw new Error('Unexpected token');
  }
}

const parse = (text: string): Chart => {
  try {
    const [composition, rest] = parseComposition(
      tokenize(text)
    );
    return { composition };
  } catch (e) {
    console.error(e);
    return { composition: [] };
  }
}


const CML = () => {
  const [chartText, setChartText] = useState('');
  const tokens = parse(chartText);
  return (
    <div>
      <h1>Chord Chart Markup Language</h1>
      <textarea value={chartText}
        onChange={e => setChartText(e.target.value)}
      />
      <pre>
        {JSON.stringify(tokens, null, 2)}
      </pre>
    </div>
  );
}

export default dynamic(Promise.resolve(CML), { ssr: false });

