import getUserUserData from '@/common/utils/serverSideUserData';
import getUserNotionData from '@/common/utils/userNotinData';
import { GetServerSidePropsContext } from 'next';

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
jest.mock('@/common/lib/firebase/firestore', jest.fn());
jest.mock('@/common/utils/userNotinData');

describe('getServerSideUserData', () => {
  const mockedContext = {
    req: {
      headers: {
        cookie: 'token=token',
      },
    },
  };

  describe('when got no error', () => {
    const mockedNotionData = {
      fivebook: { dataBaseID: 'data-base-id', token: 'notion-token' },
    };

    beforeEach(() => {
      withError = false;
    });

    describe('when verified token', () => {
      test('returns user and notion data', async () => {
        // Arrange
        const expectedResult = { user: userData, notionData: mockedNotionData };
        (getUserNotionData as unknown as jest.Mock).mockImplementationOnce(
          () => ({ notionData: mockedNotionData })
        );
        // Act
        const result = await getUserUserData(
          mockedContext as unknown as GetServerSidePropsContext
        );
        // Assert
        expect(result).toEqual(expectedResult);
        expect(getUserNotionData).toHaveBeenCalledWith(userData.uid);
      });
    });
  });

  describe('when got error', () => {
    beforeEach(() => {
      withError = true;
    });

    describe('when got error', () => {
      test('returns notion data', async () => {
        // Arrange
        const expectedResult = { user: null, notionData: null };
        // Act
        const result = await getUserUserData(
          mockedContext as unknown as GetServerSidePropsContext
        );
        // Assert
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
