import NotionPropertiesSerializer from '../propertiesSerializer';

describe('propertiesSerializer', () => {
  test('serializes data', () => {
    // Arange
    const titleAttr = 'title attribute';
    const numberAttr = 9;
    const urlCoverAttr = 'url cover Attribute';
    const urlAttr = 'url Attribute';
    const selectAttr = 'select Attribute';
    const dateAttr = 'date Attribute';
    const richTextAttr = 'rich text Attribute';
    const checkBoxAttr = true;

    const attributes = {
      titleAttr,
      numberAttr,
      urlCoverAttr,
      urlAttr,
      selectAttr,
      dateAttr,
      richTextAttr,
      checkBoxAttr,
    };

    const expectedResult = {
      Name: {
        title: [
          {
            text: {
              content: titleAttr,
            },
          },
        ],
      },
      'Number Key': { number: numberAttr },
      cover: { type: 'external', external: { url: urlCoverAttr } },
      'URL Key': { url: urlAttr },
      'Select Key': { select: { name: selectAttr } },
      'Date Key': {
        date: { start: dateAttr },
      },
      'Rich Text Key': {
        type: 'rich_text',
        rich_text: [
          {
            text: { content: richTextAttr },
          },
        ],
      },
      'Check Box Key': {
        checkbox: true,
      },
    };
    const propertiesSerializer = new NotionPropertiesSerializer(attributes);
    // Act
    const result = {
      ...propertiesSerializer.getName('titleAttr'),
      ...propertiesSerializer.getName('unknown name attribute'),
      ...propertiesSerializer.getNumber('Number Key', 'numberAttr'),
      ...propertiesSerializer.getNumber(
        'Number Key',
        'unknown number attribute'
      ),
      ...propertiesSerializer.getUrlCover('urlCoverAttr'),
      ...propertiesSerializer.getUrlCover('unknown url cover attribute'),
      ...propertiesSerializer.getUrl('URL Key', 'urlAttr'),
      ...propertiesSerializer.getUrl('URL Key', 'unknown url attribute'),
      ...propertiesSerializer.getSelect('Select Key', 'selectAttr'),
      ...propertiesSerializer.getSelect(
        'Select Key',
        'unknown select attribute'
      ),
      ...propertiesSerializer.getDate('Date Key', 'dateAttr'),
      ...propertiesSerializer.getDate('Date Key', 'unknown date attribute'),
      ...propertiesSerializer.getRichText('Rich Text Key', 'richTextAttr'),
      ...propertiesSerializer.getRichText(
        'Rich Text Key',
        'unknown rich text attribute'
      ),
      ...propertiesSerializer.getCheckbox('Check Box Key', 'checkBoxAttr'),
    };
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
