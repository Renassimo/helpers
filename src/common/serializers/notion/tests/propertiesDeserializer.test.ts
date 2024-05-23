import { NotionResult } from '@/common/types/notion';

import NotionPropertiesDeserializer from '@/common/serializers/notion';

describe('NotionPropertiesDeserializer', () => {
  const mockedResult = {
    archived: false,
    cover: null,
    created_by: {
      id: 'created_by_id',
      object: 'created_by_object',
    },
    created_time: 'created_time',
    icon: { type: 'icon', emoji: '❤️' },
    id: 'id',
    last_edited_by: {
      id: 'last_edited_by_id',
      object: 'last_edited_by_object',
    },
    object: 'block',
    parent: {
      database_id: 'database_id',
      id: 'parent_id',
    },
    properties: {
      'Text Property': {
        id: '%5BpS%5D',
        type: 'rich_text',
        rich_text: [
          {
            annotations: {},
            href: null,
            plain_text: 'Petra / البتراء',
            text: { content: 'Petra / البتراء', link: null },
            type: 'text',
          },
        ],
      },
      'Select Property': {
        id: 'roQT',
        select: {
          id: '1bdac349-e78e-48f2-a4dc-4a71b2aaa642',
          name: 'Royal Jordanian',
          color: 'default',
        },
        type: 'select',
      },
      'Number Property': {
        number: 501,
        id: 'ATng',
        type: 'number',
      },
      'Date Property': {
        date: { start: '2011-09-01', end: null, time_zone: null },
        id: 'ANGn',
        type: 'date',
      },
      'Checkbox Property': {
        checkbox: false,
        id: 'lcNW',
        type: 'checkbox',
      },
      'Url Property': {
        id: 'K%7CvI',
        type: 'url',
        url: 'https://www.planespotters.net/airframe/airbus-a320-200-jy-ayr-royal-jordanian/elzw9v',
      },
    },
    url: 'url',
  };

  test('deserializes attributes', () => {
    // Arrange
    const deserializer = new NotionPropertiesDeserializer(
      mockedResult as unknown as NotionResult
    );
    // Act
    const result = {
      textAttribute: deserializer.getTextAttribute('Text Property'),
      selectAttribute: deserializer.getSelectAttribute('Select Property'),
      numberAttribute: deserializer.getNumberAttribute('Number Property'),
      dateAttribute: deserializer.getDateAttribute('Date Property'),
      checkboxAttribute: deserializer.getCheckboxAttribute('Checkbox Property'),
      urlAttribute: deserializer.getUrlAttribute('Url Property'),
    };
    // Assert
    expect(result).toEqual({
      textAttribute:
        mockedResult.properties['Text Property'].rich_text[0].plain_text,
      selectAttribute: mockedResult.properties['Select Property'].select.name,
      numberAttribute: mockedResult.properties['Number Property'].number,
      dateAttribute: mockedResult.properties['Date Property'].date.start,
      checkboxAttribute: mockedResult.properties['Checkbox Property'].checkbox,
      urlAttribute: mockedResult.properties['Url Property'].url,
    });
  });

  describe('when attributes are wrong', () => {
    test('returns null', () => {
      // Arrange
      const deserializer = new NotionPropertiesDeserializer(
        mockedResult as unknown as NotionResult
      );
      // Act
      const result = {
        textAttribute: deserializer.getTextAttribute('Select Property'),
        selectAttribute: deserializer.getSelectAttribute('Date Property'),
        numberAttribute: deserializer.getDateAttribute('Number Property'),
        dateAttribute: deserializer.getDateAttribute('Checkbox Property'),
        checkboxAttribute: deserializer.getCheckboxAttribute('Url Property'),
        urlAttribute: deserializer.getUrlAttribute('Text Property'),
      };
      // Assert
      expect(result).toEqual({
        textAttribute: null,
        selectAttribute: null,
        numberAttribute: null,
        dateAttribute: null,
        checkboxAttribute: null,
        urlAttribute: null,
      });
    });
  });

  describe('when attributes not found', () => {
    test('returns null', () => {
      // Arrange
      const deserializer = new NotionPropertiesDeserializer(
        {} as unknown as NotionResult
      );
      // Act
      const result = {
        textAttribute: deserializer.getTextAttribute('Text Property'),
        selectAttribute: deserializer.getSelectAttribute('Select Property'),
        numberAttribute: deserializer.getDateAttribute('Number Property'),
        dateAttribute: deserializer.getDateAttribute('Date Property'),
        checkboxAttribute:
          deserializer.getCheckboxAttribute('Checkbox Property'),
        urlAttribute: deserializer.getUrlAttribute('Url Property'),
      };
      // Assert
      expect(result).toEqual({
        textAttribute: null,
        selectAttribute: null,
        numberAttribute: null,
        dateAttribute: null,
        checkboxAttribute: null,
        urlAttribute: null,
      });
    });
  });
});
