import getUserNotionData from '@/utils/userNotinData';

let notionData: unknown;
let id: unknown;

jest.mock('@/lib/firebase/firestore', () => ({
  collection: () => ({
    doc: () => ({
      get: () => ({
        data: () => ({
          notionData,
        }),
        id,
      }),
    }),
  }),
}));

describe('getUserNotionData', () => {
  const mockedUid = 'uid';
  const mockedNotionData = {
    fiveBook: { dataBaseId: 'data-base-id', token: 'token' },
  };

  describe('when got user', () => {
    beforeEach(() => {
      id = mockedUid;
    });

    describe('and got notion data', () => {
      beforeEach(() => {
        notionData = mockedNotionData;
      });

      test('returns notion data', async () => {
        // Arrange
        const expectedResult = {
          id: mockedUid,
          notionData: mockedNotionData,
        };
        // Act
        const result = await getUserNotionData(mockedUid);
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('and did not get notion data', () => {
      beforeEach(() => {
        notionData = undefined;
      });

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
});
