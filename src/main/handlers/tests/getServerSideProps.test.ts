import getServerSideProps from '../getServerSideProps';
import { GetServerSidePropsContextWithAuth } from '@/common/types/auth';

describe('getServerSideProps', () => {
  const mockedDataBaseID = 'data-base-id';
  const mockedNotionToken = 'token';
  const mockedUser = { name: 'User' };

  test('returns props', async () => {
    // Arrange
    const mockedNotionData = {
      someHelper: {
        dataBaseID: mockedDataBaseID,
        token: mockedNotionToken,
      },
    };
    const mockedContext = {
      user: mockedUser,
      notionData: mockedNotionData,
      pages: [{ title: 'Some Helper', url: '/someHelper' }],
    };
    const expectedResult = {
      props: {
        user: mockedUser,
        pages: [{ title: 'Some Helper', url: '/someHelper' }],
      },
    };
    // Act
    const result = await getServerSideProps(
      mockedContext as unknown as GetServerSidePropsContextWithAuth
    );
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
