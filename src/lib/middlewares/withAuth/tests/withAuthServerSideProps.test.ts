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
  const mockedDataBaseId = 'data-base-id';
  const mockedNotionToken = 'notion-token';
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
        dataBaseID: mockedDataBaseId,
        token: mockedNotionToken,
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
          destination: '/sign-in',
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
      const expectedResult = handlerResult;
      mockedNotionData = {
        [helperName]: {
          dataBaseID: mockedDataBaseId,
          token: mockedNotionToken,
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
          dataBaseID: mockedDataBaseId,
          token: mockedNotionToken,
        },
        user: mockedUser,
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
            dataBaseID: mockedDataBaseId,
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
