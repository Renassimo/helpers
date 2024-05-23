import { GetServerSidePropsContext } from 'next';
import getServerSideUserData from '@/utils/serverSideUserData';
import getServerSideProps from '../getServerSideProps';

jest.mock('@/utils/serverSideUserData');
jest.mock('@/common/lib/firebase/auth', jest.fn());
jest.mock('@/common/lib/firebase/firestore', jest.fn());

describe('getServerSideProps', () => {
  test('returns redirect to sign in', async () => {
    // Arrange
    const mockedContext = {
      querySting: {},
    };
    const mockedUser = {
      name: 'User',
    };
    const mockedGetServerSideUserData = jest.fn(() => ({
      user: mockedUser,
    }));
    (getServerSideUserData as unknown as jest.Mock).mockImplementationOnce(
      mockedGetServerSideUserData
    );

    const expectedResult = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
    // Act
    const result = await getServerSideProps(
      mockedContext as unknown as GetServerSidePropsContext
    );
    // Assert
    expect(result).toEqual(expectedResult);
  });

  describe('when got no user', () => {
    test('returns empty props', async () => {
      // Arrange
      const mockedContext = {
        querySting: {},
      };
      const mockedGetServerSideUserData = jest.fn(() => ({}));
      (getServerSideUserData as unknown as jest.Mock).mockImplementationOnce(
        mockedGetServerSideUserData
      );

      const expectedResult = {
        props: {},
      };
      // Act
      const result = await getServerSideProps(
        mockedContext as unknown as GetServerSidePropsContext
      );
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
