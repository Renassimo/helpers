import { NotionResult } from '@/types/notion';
import { FiveBookData } from '@/types/fiveBook';

export const deserializeDay = (result: NotionResult) => ({
  id: result?.id,
  attributes: {
    dayCode: {
      id: result?.properties?.['Day code']?.id,
      // @ts-ignore
      value: result.properties?.['Day code']?.number,
    },
    question: {
      id: result?.properties?.Question?.id,
      // @ts-ignore
      value: result?.properties?.Question?.rich_text[0]?.plain_text ?? null,
    },
    answers: Object.entries(result?.properties).reduce(
      (result, [key, value]) => {
        const [name, year] = key.split(' ');
        if (name === 'Answer') {
          return {
            ...result,
            [year]: {
              id: value?.id,
              // @ts-ignore
              value: value?.rich_text[0]?.plain_text ?? null,
            },
          };
        }
        return result;
      },
      {}
    ),
  },
});

export const serializeDay = (data: FiveBookData) => ({
  ...Object.entries(data?.attributes?.answers).reduce((result, answer) => {
    const [year, body] = answer;
    const { value } = body;
    if (value) {
      return {
        ...result,
        [`Answer ${year}`]: {
          type: 'rich_text',
          rich_text: [
            {
              text: { content: value },
            },
          ],
        },
      };
    }
    return result;
  }, {}),
});
