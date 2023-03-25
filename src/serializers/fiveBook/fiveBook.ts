import { NotionResult } from '@/types/notion';
import { FiveBookData } from '@/types/fiveBook';

export const deserializeDay = (result: NotionResult) => {
  const { id, properties, icon } = result;
  const dayCode = properties?.['Day code'];
  const question = properties?.['Question'];
  const emoji = icon?.emoji;

  return {
    id: id,
    attributes: {
      dayCode: {
        id: dayCode?.id,
        value: String(dayCode?.number),
      },
      question: {
        id: question?.id,
        emoji,
        value: question?.rich_text?.[0]?.plain_text ?? null,
      },
      answers: Object.entries(result?.properties).reduce(
        (result, [key, answer]) => {
          const [name, year] = key.split(' ');
          if (name === 'Answer') {
            return {
              ...result,
              [year]: {
                id: answer?.id,
                value: answer?.rich_text?.[0]?.plain_text ?? null,
              },
            };
          }
          return result;
        },
        {}
      ),
    },
  };
};

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
