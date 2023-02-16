import getServerSideProps from '../getServerSideProps';
import { GetServerSidePropsContextWithAuth } from '@/types/auth';

describe('getServerSideProps', () => {
  const mockedDataBaseID = 'data-base-id';
  const mockedDataBaseID2 = 'data-base-id-2';
  const mockedNotionToken = 'token';
  const mockedNotionToken2 = 'toke-2n';
  const mockedHelperName = 'Helper Name';
  const mockedHelperPath = '/helper';
  const mockedUser = { name: 'User' };

  test('returns props', async () => {
    // Arrange
    const mockedNotionData = {
      someHelper: {
        dataBaseID: mockedDataBaseID,
        token: mockedNotionToken,
      },
      anotherHelper: {
        dataBaseID: mockedDataBaseID2,
        token: mockedNotionToken2,
        name: mockedHelperName,
        path: mockedHelperPath,
      },
    };
    const mockedContext = {
      user: mockedUser,
      notionData: mockedNotionData,
    };
    const expectedResult = {
      props: {
        user: mockedUser,
        pages: [
          { title: 'Some Helper', url: '/someHelper' },
          { title: mockedHelperName, url: mockedHelperPath },
        ],
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
