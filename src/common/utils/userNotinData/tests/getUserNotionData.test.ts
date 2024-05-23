import getUserNotionData from '@/common/utils/userNotinData';

let withError: boolean;
let notionData: unknown;
let id: unknown;

jest.mock('@/common/lib/firebase/firestore', () => ({
  collection: () => ({
    doc: () => ({
      get: () => {
        return !withError
          ? {
              data: () => ({
                notionData,
              }),
              id,
            }
          : {};
      },
    }),
  }),
}));

describe('getUserNotionData', () => {
  describe('when got no error', () => {
    const mockedUid = 'uid';
    const mockedNotionData = {
      fiveBook: { dataBaseId: 'data-base-id', token: 'token' },
    };

    beforeEach(() => {
      withError = false;
    });

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

  describe('when got error', () => {
    const mockedUid = 'uid';

    beforeEach(() => {
      withError = true;
    });

    test('returns notion as null', async () => {
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
