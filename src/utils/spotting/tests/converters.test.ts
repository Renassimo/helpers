import {
  convertLinesIntoText,
  convertName,
  convertPlace,
  getTextLine,
} from '@/utils/spotting';

describe('Converters', () => {
  describe('convertName', () => {
    test('converts name', () => {
      // Arrange
      const expectedResult = 'AirbusA320200';
      // Act
      const result = convertName('Airbus A320-200');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when passed null', () => {
      test('returns null', () => {
        // Arrange
        const expectedResult = null;
        // Act
        const result = convertName(null);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('convertPlace', () => {
    test('converts place', () => {
      // Arrange
      const expectedResult = 'WAW_EPWA';
      // Act
      const result = convertPlace('WAW/EPWA');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when passed null', () => {
      test('returns null', () => {
        // Arrange
        const expectedResult = null;
        // Act
        const result = convertPlace(null);
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
});
