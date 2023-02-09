import getUserUserData from '@/utils/serverSideUserData';
import { GetServerSidePropsContext } from 'next';

jest.mock('@/lib/firebase/auth', jest.fn());
jest.mock('@/utils/userNotinData', jest.fn());

describe('serverSideUserData', () => {
  const mockedContext = {
    req: {
      headers: {
        cookie: 'token=token',
      },
    },
  };

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
