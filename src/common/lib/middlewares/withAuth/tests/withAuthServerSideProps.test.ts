import withAuthServerSideProps from '../withAuthServerSideProps';
import { GetServerSidePropsContext } from 'next';

import getServerSideUserData from '@/common/utils/serverSideUserData';

import { Firestore } from '@/common/lib/firebase/types';

jest.mock('@/common/utils/serverSideUserData');
jest.mock('@/common/lib/firebase/auth', jest.fn());

describe('withAuthServerSideProps', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
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
  let mockedHelpersData: unknown = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockedUser = {
      name: 'Name',
    };
    mockedHelpersData = {
      someHelper: {
        notiondData: {
          dataBaseID: mockedDataBaseID,
          token: mockedNotionToken,
        },
      },
      anotherHelper: {
        notionData: {
          dataBaseID: mockedDataBaseID2,
          token: mockedNotionToken2,
        },
        title: mockedHelperName2,
        path: mockedHelperPath2,
      },
    };
    const mockedGetServerSideUserData = jest.fn(() => ({
      user: mockedUser,
      helpersData: mockedHelpersData,
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
    ];
    const expectedResult = handlerResult;
    // Act
    const result = await withAuthServerSideProps(
      mockedHandler,
      mockedDb
    )(mockedContext as unknown as GetServerSidePropsContext);
    // Assert
    expect(getServerSideUserData).toHaveBeenCalledWith(mockedContext, mockedDb);
    expect(mockedHandler).toHaveBeenCalledWith({
      ...mockedContext,
      helpersData: mockedHelpersData,
      user: mockedUser,
      pages: expectedPages,
      db: mockedDb,
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
      const result = await withAuthServerSideProps(
        mockedHandler,
        mockedDb
      )(mockedContext as unknown as GetServerSidePropsContext);
      // Assert
      expect(getServerSideUserData).toHaveBeenCalledWith(
        mockedContext,
        mockedDb
      );
      expect(mockedHandler).not.toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when got no Helpers data', () => {
    test('returns 404', async () => {
      // Arrange
      mockedHelpersData = undefined;
      mockedUser = {
        name: 'Name',
      };
      const expectedResult = { notFound: true };
      // Act
      const result = await withAuthServerSideProps(
        mockedHandler,
        mockedDb
      )(mockedContext as unknown as GetServerSidePropsContext);
      // Assert
      expect(getServerSideUserData).toHaveBeenCalledWith(
        mockedContext,
        mockedDb
      );
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
      ];
      const expectedResult = handlerResult;
      mockedHelpersData = {
        [helperName]: {
          notionData: {
            dataBaseID: mockedDataBaseID,
            token: mockedNotionToken,
          },
        },
        anotherHelper: {
          notionData: {
            dataBaseID: mockedDataBaseID2,
            token: mockedNotionToken2,
          },
          title: mockedHelperName2,
          path: mockedHelperPath2,
        },
      };
      // Act
      const result = await withAuthServerSideProps(
        mockedHandler,
        mockedDb,
        helperName
      )(mockedContext as unknown as GetServerSidePropsContext);
      // Assert
      expect(getServerSideUserData).toHaveBeenCalledWith(
        mockedContext,
        mockedDb
      );
      expect(mockedHandler).toHaveBeenCalledWith({
        ...mockedContext,
        notionHelperData: {
          dataBaseID: mockedDataBaseID,
          token: mockedNotionToken,
        },
        user: mockedUser,
        pages: expectedPages,
        db: mockedDb,
      });
      expect(result).toEqual(expectedResult);
    });

    describe('when got no Helpers data', () => {
      test('returns 404', async () => {
        // Arrange
        mockedHelpersData = undefined;
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          mockedDb,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(
          mockedContext,
          mockedDb
        );
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got no Helper data', () => {
      test('returns 404', async () => {
        // Arrange
        mockedHelpersData = {};
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          mockedDb,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(
          mockedContext,
          mockedDb
        );
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got no dataBaseID', () => {
      test('returns 404', async () => {
        // Arrange
        mockedHelpersData = {
          [helperName]: {
            notionData: {
              token: mockedNotionToken,
            },
          },
        };
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          mockedDb,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(
          mockedContext,
          mockedDb
        );
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });

    describe('when got no Notion token', () => {
      test('returns 404', async () => {
        // Arrange
        mockedHelpersData = {
          [helperName]: {
            notionData: {
              dataBaseID: mockedDataBaseID,
            },
          },
        };
        const expectedResult = { notFound: true };
        // Act
        const result = await withAuthServerSideProps(
          mockedHandler,
          mockedDb,
          helperName
        )(mockedContext as unknown as GetServerSidePropsContext);
        // Assert
        expect(getServerSideUserData).toHaveBeenCalledWith(
          mockedContext,
          mockedDb
        );
        expect(mockedHandler).not.toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
