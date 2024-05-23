import { LineWord } from '@/spotting/types';

const splitRegexp = / |\/|-|\./;

export const convertText = (name: string | null, joiner = '') =>
  name?.split(splitRegexp).join(joiner) ?? null;

export const putTheLine = (line: string) => (line.trim() ? `${line}\n` : '');

export const getTextLine = (words: LineWord[]) =>
  words.reduce((result, word: LineWord) => {
    const divider = String(result)?.length > 0 ? ' ' : '';

    return word ? `${result}${divider}${word}` : result;
  }, '');

export const convertLinesIntoText = (lines: LineWord[][]) =>
  lines.reduce((result, line: LineWord[]) => {
    if (line.length === 0) return result;

    const divider = String(result)?.length > 0 ? '\n' : '';
    const textLine = getTextLine(line);

    if (String(textLine).length === 0) return result;

    return `${result}${divider}${textLine}`;
  }, '');

export const appendEmptyLines = (text: string) =>
  text
    .split('\n')
    .filter((line) => line)
    .join('\n\n');
