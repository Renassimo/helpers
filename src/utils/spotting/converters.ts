type LineWord = string | null | undefined | false;

export const convertName = (name: string | null) =>
  name?.split('-').join('').split(' ').join('') ?? null;

export const convertPlace = (place: string | null) =>
  place?.split('/').join('_') ?? null;

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
