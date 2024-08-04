import { getAttributeObjectFromArray } from '../getAttributeObjectFromArray';

describe('getAttributeObjectFromArray', () => {
  const mockedId1 = 'id1';
  const mockedId2 = 'id2';
  const mockedAttributes1 = { attr1: 'attr1-1', attr2: 'attr2-1' };
  const mockedAttributes2 = { attr1: 'attr1-2', attr2: 'attr2-2' };
  const mockedArray = [
    { id: mockedId1, attributes: mockedAttributes1 },
    { id: mockedId2, attributes: mockedAttributes2 },
  ];
  test('return object from array', () => {
    // Arange
    const expectedObject = {
      [mockedId1]: mockedArray[0],
      [mockedId2]: mockedArray[1],
    };
    // Act
    const result = getAttributeObjectFromArray(mockedArray);
    // Assert
    expect(result).toEqual(expectedObject);
  });

  describe('when additional attributes passed', () => {
    test('return object from array', () => {
      // Arange
      const additionalAttributes = { addtional: true };
      const expectedObject = {
        [mockedId1]: {
          ...mockedArray[0],
          attributes: { ...mockedArray[0].attributes, ...additionalAttributes },
        },
        [mockedId2]: {
          ...mockedArray[1],
          attributes: { ...mockedArray[1].attributes, ...additionalAttributes },
        },
      };
      // Act
      const result = getAttributeObjectFromArray(
        mockedArray,
        additionalAttributes
      );
      // Assert
      expect(result).toEqual(expectedObject);
    });
  });
});
