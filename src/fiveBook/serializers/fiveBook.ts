import { NotionResult } from '@/types/notion';
import { FiveBookData } from '@/types/fiveBook';
import NotionPropertiesDeserializer from '@/common/serializers/notion';

export const deserializeDay = (result: NotionResult) => {
  const deserializer = new NotionPropertiesDeserializer(result);

  return {
    id: deserializer.id,
    attributes: {
      dayCode: String(deserializer.getNumberAttribute('Day code')),
      emoji: deserializer.emoji,
      question: deserializer.getTextAttribute('Question'),
      answers: Object.keys(result?.properties).reduce((result, key) => {
        const [name, year] = key.split(' ');
        if (name === 'Answer') {
          return {
            ...result,
            [year]: deserializer.getTextAttribute(`Answer ${year}`),
          };
        }
        return result;
      }, {}),
    },
  };
};

export const serializeDay = (data: FiveBookData) => ({
  ...Object.entries(data?.attributes?.answers).reduce((result, answer) => {
    const [year, body] = answer;
    if (body) {
      return {
        ...result,
        [`Answer ${year}`]: {
          type: 'rich_text',
          rich_text: [
            {
              text: { content: body },
            },
          ],
        },
      };
    }
    return result;
  }, {}),
});
