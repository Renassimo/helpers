import getUserHelpersData from '@/common/utils/userHelpersData';

let withError: boolean;
let helpersData: unknown;
let id: unknown;

jest.mock('@/common/lib/firebase/firestore', () => ({
  collection: () => ({
    doc: () => ({
      get: () => {
        return !withError
          ? {
              data: () => ({
                helpersData,
              }),
              id,
            }
          : {};
      },
    }),
  }),
}));

describe('getUserHelpersData', () => {
  describe('when got no error', () => {
    const mockedUid = 'uid';
    const mockedHelpersData = {
      fiveBook: {
        notionData: {
          dataBaseId: 'data-base-id',
          token: 'token',
          path: '/5book',
          title: '5book',
        },
      },
    };

    beforeEach(() => {
      withError = false;
    });

    describe('when got user', () => {
      beforeEach(() => {
        id = mockedUid;
      });

      describe('and got helpers data', () => {
        beforeEach(() => {
          helpersData = mockedHelpersData;
        });

        test('returns helpers data', async () => {
          // Arrange
          const expectedResult = {
            id: mockedUid,
            helpersData: mockedHelpersData,
          };
          // Act
          const result = await getUserHelpersData(mockedUid);
          // Assert
          expect(result).toEqual(expectedResult);
        });
      });

      describe('and did not get helpers data', () => {
        beforeEach(() => {
          helpersData = undefined;
        });

        test('returns helpers data', async () => {
          // Arrange
          const expectedResult = {
            id: mockedUid,
            helpersData: null,
          };
          // Act
          const result = await getUserHelpersData(mockedUid);
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

    test('returns helpers as null', async () => {
      // Arrange
      const expectedResult = {
        id: mockedUid,
        helpersData: null,
      };
      // Act
      const result = await getUserHelpersData(mockedUid);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
