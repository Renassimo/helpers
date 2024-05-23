import {
  appendEmptyLines,
  convertLinesIntoText,
  convertText,
  getTextLine,
} from '@/spotting/utils';

describe('Converters', () => {
  describe('convertText', () => {
    test('converts name', () => {
      // Arrange
      const expectedResult = 'AirbusA320200';
      // Act
      const result = convertText('Airbus A320-200');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    test('converts place', () => {
      // Arrange
      const expectedResult = 'WAW_EPWA';
      // Act
      const result = convertText('WAW/EPWA', '_');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    test('converts museum place', () => {
      // Arrange
      const expectedResult = 'Swiss_Museum_of_Transport';
      // Act
      const result = convertText('Swiss Museum of Transport', '_');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    test('converts cn with dots', () => {
      // Arrange
      const expectedResult = 'c101';
      // Act
      const result = convertText('c.101');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when passed null', () => {
      test('returns null', () => {
        // Arrange
        const expectedResult = null;
        // Act
        const result = convertText(null);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getTextLine', () => {
    test('returns text', () => {
      // Arrange
      const expectedResult = 'Word1 word2';
      // Act
      const result = getTextLine(['Word1', null, undefined, false, 'word2']);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('convertLinesIntoText', () => {
    test('returns text', () => {
      // Arrange
      const expectedResult = 'Word1 word2\nWord3 Word4';
      // Act
      const result = convertLinesIntoText([
        ['Word1', null, undefined, false, 'word2'],
        [null, undefined, false],
        [],
        ['Word3', 'Word4'],
      ]);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('appendEmptyLines', () => {
    test('returns text with added empty lines', () => {
      // Arrange
      const expectedResult = 'Hello world!\n\nYo\n\nIt is me!';
      // Act
      const result = appendEmptyLines('Hello world!\nYo\n\nIt is me!');
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
