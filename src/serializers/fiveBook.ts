import { NotionResult } from '@/types/notion';

export const deserializeDay = (result: NotionResult, dayCode: string) => ({
  id: result?.id,
  attributes: {
    dayCode: +dayCode,
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
