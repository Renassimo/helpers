import { getHashtags, insertHashes, insHash, insRHash } from '@/utils/spotting';

describe('Hashtags', () => {
  describe('insHash', () => {
    test('inserts hash', () => {
      // Arrange
      const expectedResult = '#hashtag';
      // Act
      const result = insHash('hashtag');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when provided null', () => {
      test('returns null', () => {
        // Arrange
        const expectedResult = null;
        // Act
        const result = insHash(null);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('insRHash', () => {
    test('inserts hash', () => {
      // Arrange
      const expectedResult = '#avr_hashtag';
      // Act
      const result = insRHash('hashtag');
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when provided null', () => {
      test('returns null', () => {
        // Arrange
        const expectedResult = null;
        // Act
        const result = insRHash(null);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('insertHashes', () => {
    test('returns hashtags array', () => {
      // Arrange
      const expectedResult = ['#hashtags', '#hashtag2'];
      // Act
      const result = insertHashes(['hashtags', 'hashtag2']);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    describe('when provided custom function', () => {
      test('returns null', () => {
        // Arrange
        const expectedResult = ['#avr_hashtags', '#avr_hashtag2'];
        // Act
        const result = insertHashes(['hashtags', 'hashtag2'], insRHash);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getHashtags', () => {
    test('returns tags', () => {
      // Arrange
      const expectedResult = {
        avrTag: '#avr_hashtags #avr_hashtag2 #avr_hashtag3',
        commonTag: '#hashtags #hashtag2',
      };
      // Act
      const result = getHashtags(['hashtags', 'hashtag2'], ['hashtag3']);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
