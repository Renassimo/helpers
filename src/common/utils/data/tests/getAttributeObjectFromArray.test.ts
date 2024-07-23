import { getAttributeObjectFromArray } from '../getAttributeObjectFromArray';

describe('getAttributeObjectFromArray', () => {
  test('return object from array', () => {
    // Arange
    const mockedId1 = 'id1';
    const mockedId2 = 'id2';
    const mockedAttributes1 = { attr1: 'attr1-1', attr2: 'attr2-1' };
    const mockedAttributes2 = { attr1: 'attr1-2', attr2: 'attr2-2' };
    const mockedArray = [
      { id: mockedId1, attributes: mockedAttributes1 },
      { id: mockedId2, attributes: mockedAttributes2 },
    ];
    const expectedObject = {
      [mockedId1]: mockedArray[0],
      [mockedId2]: mockedArray[1],
    };
    // Act
    const result = getAttributeObjectFromArray(mockedArray);
    // Assert
    expect(result).toEqual(expectedObject);
  });
});
