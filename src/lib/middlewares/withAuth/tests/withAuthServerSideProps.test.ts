import withAuthServerSideProps from '../withAuthServerSideProps';
import { GetServerSidePropsContext } from 'next';
import getServerSideUserData from '@/utils/serverSideUserData';

jest.mock('@/utils/serverSideUserData');
jest.mock('@/lib/firebase/auth', jest.fn());
jest.mock('@/lib/firebase/firestore', jest.fn());

describe('withAuthServerSideProps', () => {
  const helperName = 'fiveBook';
  const handlerResult = { result: 'handler result' };
  const mockedHandler = jest.fn(() => handlerResult);
  const mockedContext = {
    cookies: 'some cookies',
  };
  const mockedDataBaseID = 'data-base-id';
  const mockedDataBaseID2 = 'data-base-id-2';
  const mockedNotionToken = 'token';
  const mockedNotionToken2 = 'toke-2n';
  const mockedHelperName2 = 'Helper Name';
  const mockedHelperPath2 = '/helper';
  let mockedUser: unknown = {};
  let mockedNotionData: unknown = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockedUser = {
      name: 'Name',
    };
    mockedNotionData = {
      someHelper: {
        dataBaseID: mockedDataBaseID,
        token: mockedNotionToken,
      },
      anotherHelper: {
        dataBaseID: mockedDataBaseID2,
        token: mockedNotionToken2,
        title: mockedHelperName2,
        path: mockedHelperPath2,
      },
    };
    const mockedGetServerSideUserData = jest.fn(() => ({
      user: mockedUser,
      notionData: mockedNotionData,
    }));
    (getServerSideUserData as unknown as jest.Mock).mockImplementationOnce(
      mockedGetServerSideUserData
    );
  });

  test('returns handler', async () => {
    // Arrange
    const expectedPages = [
      { title: mockedHelperName2, path: mockedHelperPath2 },
      { title: 'Some Helper', path: '/someHelper' },
    ]
    const expectedResult = handlerResult;
    // Act
    const result = await withAuthServerSideProps(mockedHandler)(
      mockedContext as unknown as GetServerSidePropsContext
    );
    // Assert
    expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
    expect(mockedHandler).toHaveBeenCalledWith({
      ...mockedContext,
      notionData: mockedNotionData,
      user: mockedUser,
      pages: expectedPages,
    });
    expect(result).toEqual(expectedResult);
  });

  describe('when got no user', () => {
    test('returns redirection to sign in', async () => {
      // Arrange
      mockedUser = undefined;
      const expectedResult = {
        redirect: {
          permanent: false,
          destination: '/signIn',
        },
      };
      // Act
      const result = await withAuthServerSideProps(mockedHandler)(
        mockedContext as unknown as GetServerSidePropsContext
      );
      // Assert
      expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
      expect(mockedHandler).not.toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when got no Notion data', () => {
    test('returns 404', async () => {
      // Arrange
      mockedNotionData = undefined;
      mockedUser = {
        name: 'Name',
      };
      const expectedResult = { notFound: true };
      // Act
      const result = await withAuthServerSideProps(mockedHandler)(
        mockedContext as unknown as GetServerSidePropsContext
      );
      // Assert
      expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
      expect(mockedHandler).not.toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when helperName passed', () => {
    test('returns handler', async () => {
      // Arrange
      const expectedPages = [
        { title: 'Five Book', path: '/fiveBook' },
        { title: mockedHelperName2, path: mockedHelperPath2 },
      ]
      const expectedResult = handlerResult;
      mockedNotionData = {
        [helperName]: {
          dataBaseID: mockedDataBaseID,
          token: mockedNotionToken,
        },
        anotherHelper: {
          dataBaseID: mockedDataBaseID2,
          token: mockedNotionToken2,
          title: mockedHelperName2,
          path: mockedHelperPath2,
        },
      };
      // Act
      const result = await withAuthServerSideProps(
        mockedHandler,
        helperName
      )(mockedContext as unknown as GetServerSidePropsContext);
      // Assert
      expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
      expect(mockedHandler).toHaveBeenCalledWith({
        ...mockedContext,
        notionHelperData: {
          dataBaseID: mockedDataBaseID,
          token: mockedNotionToken,
        },
        user: mockedUser,
        pages: expectedPages,
      });
      expect(result).toEqual(expectedResult);
    });

    describe('when got no Notion data', () => {
      test('returns 404', async () => {
        // Arrange
        mockedNotionData = undefined;
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got no Helper data', () => {
      test('returns 404', async () => {
        // Arrange
        mockedNotionData = {};
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got no dataBaseID', () => {
      test('returns 404', async () => {
        // Arrange
        mockedNotionData = {
          [helperName]: {
            token: mockedNotionToken,
          },
        };
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got no Notion token', () => {
      test('returns 404', async () => {
        // Arrange
        mockedNotionData = {
          [helperName]: {
            dataBaseID: mockedDataBaseID,
          },
        };
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext);
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
