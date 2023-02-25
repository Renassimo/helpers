import { deserializeDay, serializeDay } from '@/serializers/fiveBook';
import { NotionResult } from '@/types/notion';
import { FiveBookData } from '@/types/fiveBook';

describe('Five book serializers', () => {
  describe('deserializeDay', () => {
    const dayCode = {
      id: 'day_code_number',
      type: 'number',
      number: 101,
    };
    const questionText = {
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: 'default',
      },
      href: null,
      plain_text: 'How are you?',
      text: { content: 'How are you?', link: null },
      type: 'text',
    };
    const question = {
      id: 'question_id',
      type: 'rich_text',
      rich_text: [questionText],
    };
    const answer2015 = {
      id: 'answer_2016_id',
      type: 'rich_text',
      rich_text: [],
    };
    const answer2016Text = {
      annotations: {},
      href: null,
      plain_text: 'I am fine!',
      text: {},
      type: 'text',
    };
    const answer2016 = {
      id: 'answer_2015_id',
      type: 'rich_text',
      rich_text: [answer2016Text],
    };
    const properties = {
      'Day code': dayCode,
      Question: question,
      'Answer 2015': answer2015,
      'Answer 2016': answer2016,
    };
    const data: NotionResult = {
      archived: false,
      cover: null,
      created_by: {
        id: 'created_by_id',
        object: 'created_by_object',
      },
      created_time: 'created_time',
      icon: null,
      id: 'result_id',
      last_edited_by: {
        id: 'last_edited_by_id',
        object: 'last_edited_by_object',
      },
      object: 'result_object',
      parent: {
        database_id: 'parent_database_id',
        id: 'parent_id',
      },
      properties,
      url: 'result_url',
    };

    test('returns deserialized data', () => {
      // Arrange
      const expectedResult = {
        id: data.id,
        attributes: {
          dayCode: {
            id: dayCode.id,
            value: String(dayCode.number),
          },
          question: {
            id: question.id,
            value: question.rich_text[0].plain_text,
          },
          answers: {
            2015: {
              id: answer2015.id,
              value: null,
            },
            2016: {
              id: answer2016.id,
              value: answer2016.rich_text[0].plain_text,
            },
          },
        },
      };
      // Act
      const result = deserializeDay(data as unknown as NotionResult);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SerializeDay', () => {
    const data = {
      id: 'data_id',
      attributes: {
        dayCode: {
          id: 'day_code_id',
        },
        question: {
          id: 'question_id',
          value: 'How are you?',
        },
        answers: {
          2015: {
            id: 'answer_2015_id',
            value: '',
          },
          2016: {
            id: 'answer_2016_id',
            value: 'I am fine!',
          },
        },
      },
    };

    test('returns serialized data', () => {
      // Arrange
      const expectedResult = {
        'Answer 2016': {
          rich_text: [
            {
              text: {
                content: data.attributes.answers['2016'].value,
              },
            },
          ],
          type: 'rich_text',
        },
      };
      // Act
      const result = serializeDay(data as unknown as FiveBookData);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
