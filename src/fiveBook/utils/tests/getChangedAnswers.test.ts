import getChangedAnswers from '@/fiveBook/utils/getChangedAnswers';

describe('getChangedAnswers', () => {
  const original = [
    {
      year: '2020',
      value: 'Good!',
    },
    {
      year: '2021',
      value: 'Pretty!',
    },
    {
      year: '2022',
      value: 'Nice!',
    },
    {
      year: '2023',
      value: null,
    },
  ];
  const changed = {
    '2020': 'Good!',
    '2021': 'Pretty!',
    '2022': 'Very Nice!',
    '2023': 'Amazing!',
    '2024': 'Great!',
  };

  test('returns new answers', () => {
    // Arrange
    const expectedResult = {
      '2023': 'Amazing!',
    };
    // Act
    const result = getChangedAnswers(original, changed);
    // Assert
    expect(result).toEqual(expectedResult);
  });

  describe('when update allowed', () => {
    test('returns new and changed answers', () => {
      // Arrange
      const expectedResult = {
        '2022': 'Very Nice!',
        '2023': 'Amazing!',
      };
      // Act
      const result = getChangedAnswers(original, changed, false);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when original answers not provided', () => {
    test('returns null', () => {
      // Arrange
      const expectedResult = null;
      // Act
      const result = getChangedAnswers([], changed);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when changed answers not provided', () => {
    test('returns null', () => {
      // Arrange
      const expectedResult = null;
      // Act
      const result = getChangedAnswers(original, {});
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
