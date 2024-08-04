import getUserUserData from '@/common/utils/serverSideUserData';
import getUserHelpersData from '@/common/utils/userHelpersData';
import { GetServerSidePropsContext } from 'next';
import { Firestore } from '@/common/lib/firebase/types';

let withError: boolean;
const userData = {
  email: 'email@example.com',
  name: 'Name',
  picture: 'https://pic.net',
  uid: 'uid',
};

jest.mock(
  '@/common/lib/firebase/auth',
  jest.fn(() => ({
    verifyIdToken: () => !withError && userData,
  }))
);
jest.mock('@/common/utils/userHelpersData');

describe('getServerSideUserData', () => {
  const mockedContext = {
    req: {
      headers: {
        cookie: 'token=token',
      },
    },
  } as unknown as GetServerSidePropsContext;
  const mockedDb = 'mockedDb' as unknown as Firestore;

  describe('when got no error', () => {
    const mockedHelpersData = {
      fivebook: {
        notionData: { dataBaseID: 'data-base-id', token: 'notion-token' },
      },
    };

    beforeEach(() => {
      withError = false;
    });

    describe('when verified token', () => {
      test('returns user and notion data', async () => {
        // Arrange
        const expectedResult = {
          user: userData,
          helpersData: mockedHelpersData,
        };
        (getUserHelpersData as unknown as jest.Mock).mockImplementationOnce(
          () => ({ helpersData: mockedHelpersData })
        );
        // Act
        const result = await getUserUserData(mockedContext, mockedDb);
        // Assert
        expect(result).toEqual(expectedResult);
        expect(getUserHelpersData).toHaveBeenCalledWith(userData.uid, mockedDb);
      });
    });
  });

  describe('when got error', () => {
    beforeEach(() => {
      withError = true;
    });
    test('returns notion data', async () => {
      // Arrange
      const expectedResult = { user: null, helpersData: null };
      // Act
      const result = await getUserUserData(mockedContext, mockedDb);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
