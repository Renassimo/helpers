import getUserNotionData from '@/utils/userNotinData';

jest.mock('@/lib/firebase/firestore', jest.fn());

describe('getUserNotionData fail', () => {
  const mockedUid = 'uid';

  describe('when got error', () => {
    test('returns notion data', async () => {
      // Arrange
      const expectedResult = {
        id: mockedUid,
        notionData: null,
      };
      // Act
      const result = await getUserNotionData(mockedUid);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
