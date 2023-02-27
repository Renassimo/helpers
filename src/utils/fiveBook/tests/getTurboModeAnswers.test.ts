import getTurboModeAnswers from '@/utils/fiveBook/getTurboModeAnswers';

describe('getTurboModeAnswers', () => {
  test('returns split answers', () => {
    // Arrange
    const answer =
      'Cool!\nI like it!\n\nNeed more patience\n\n\n\nHow about to buy it?\n\n\nGood idea!\n\nNo way!';
    const yearOptions = ['2024', '2023', '2021', '2020', '2019', '2018'];
    const year = '2023';
    const expectedResult = {
      '2023': 'Cool!\nI like it!',
      '2021': 'Need more patience',
      '2020': '',
      '2019': 'How about to buy it?',
      '2018': '\nGood idea!',
    };
    // Act
    const result = getTurboModeAnswers(answer, yearOptions, year);
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
