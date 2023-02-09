import getUserUserData from '@/utils/serverSideUserData';
import getUserNotionData from '@/utils/userNotinData';
import { GetServerSidePropsContext } from 'next';

const userData = {
  email: 'email@example.com',
  name: 'Name',
  picture: 'https://pic.net',
  uid: 'uid',
};

jest.mock(
  '@/lib/firebase/auth',
  jest.fn(() => ({
    verifyIdToken: () => userData,
  }))
);
jest.mock('@/lib/firebase/firestore', jest.fn());
jest.mock('@/utils/userNotinData');

describe('serverSideUserData', () => {
  const mockedContext = {
    req: {
      headers: {
        cookie: 'token=token',
      },
    },
  };
  const mockedNotionData = {
    fivebook: { dataBaseID: 'data-base-id', token: 'notion-token' },
  };

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
    });
  });
});
