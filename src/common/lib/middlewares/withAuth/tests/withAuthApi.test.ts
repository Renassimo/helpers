import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { Firestore } from '@/common/lib/firebase/types';

import { getError } from '@/common/utils/errors';
import getUserHelpersData from '@/common/utils/userHelpersData';

import withAuthApi from '../withAuthApi';

let withoutError: boolean;
let userData: unknown;
let mockedErrorCode: unknown;

jest.mock('@/common/utils/errors');
jest.mock('@/common/utils/userHelpersData');
jest.mock('@/common/lib/firebase/firestore', jest.fn());
jest.mock(
  '@/common/lib/firebase/auth',
  jest.fn(() => ({
    verifyIdToken: () => {
      if (!withoutError) {
        return userData;
      } else {
        throw {
          errorInfo: {
            code: mockedErrorCode,
          },
        };
      }
    },
  }))
);

describe('withAuthApi', () => {
  const mockedDb = 'mockedDb' as unknown as Firestore;
  const mockedHandler = jest.fn();
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const mockedGetError = { error: 'error' };
  const mockedRes = { status: mockedStatus };
  const helperName = 'fiveBook';
  let mockedHelpersData: unknown = undefined;
  const mockedGetUserHelpersData = jest.fn(() => ({
    helpersData: mockedHelpersData,
  }));
  const mockedAeroDataBoxData = 'aeroDataBoxData';

  describe('when got no errors', () => {
    const mockedUid = 'uid';

    beforeEach(() => {
      (getError as unknown as jest.Mock).mockImplementationOnce(() => ({
        error: 'error',
      }));
      (getUserHelpersData as unknown as jest.Mock).mockImplementationOnce(
        mockedGetUserHelpersData
      );
      mockedHelpersData = undefined;
      withoutError = false;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('returns handler', async () => {
      // Arrange
      userData = {
        email: 'email@example.com',
        name: 'Name',
        picture: 'https://pic.net',
        uid: mockedUid,
      };
      mockedHelpersData = {
        anyHelper: {
          notionData: {
            token: undefined,
          },
        },
      };

      const mockedToken = 'token';
      const mockedCookies = { token: mockedToken };
      const mockedReq = { cookies: mockedCookies };

      const expectedReq = {
        ...mockedReq,
        uid: mockedUid,
        helpersData: mockedHelpersData,
        db: mockedDb,
      };

      // Act
      await withAuthApi(mockedHandler, mockedDb)(
        mockedReq as unknown as NextApiRequestWithAuth,
        mockedRes as unknown as NextApiResponse
      );
      // Assert
      expect(mockedStatus).not.toHaveBeenCalled();
      expect(mockedJson).not.toHaveBeenCalled();
      expect(getError).not.toHaveBeenCalled();
      expect(mockedReq).toEqual(expectedReq);
    });

    describe('when got no token', () => {
      test('returns 401 error', async () => {
        // Arrange
        const mockedToken = null;
        const mockedCookies = { token: mockedToken };
        const mockedReq = { cookies: mockedCookies };

        const expectedReq = {
          ...mockedReq,
        };
        const expectedStatus = 401;

        // Act
        await withAuthApi(mockedHandler, mockedDb)(
          mockedReq as unknown as NextApiRequestWithAuth,
          mockedRes as unknown as NextApiResponse
        );

        // Assert
        expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
        expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
        expect(getError).toHaveBeenCalledWith(expectedStatus, 'No token');
        expect(mockedReq).toEqual(expectedReq);
      });
    });

    describe('when got no decoded token', () => {
      test('returns 401 error', async () => {
        // Arrange
        userData = null;

        const mockedToken = 'token';
        const mockedCookies = { token: mockedToken };
        const mockedReq = { cookies: mockedCookies };

        const expectedReq = {
          ...mockedReq,
        };
        const expectedStatus = 401;

        // Act
        await withAuthApi(mockedHandler, mockedDb)(
          mockedReq as unknown as NextApiRequestWithAuth,
          mockedRes as unknown as NextApiResponse
        );

        // Assert
        expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
        expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
        expect(getError).toHaveBeenCalledWith(expectedStatus);
        expect(mockedReq).toEqual(expectedReq);
      });
    });

    describe('when got no uid', () => {
      test('returns 401 error', async () => {
        // Arrange
        userData = {
          email: 'email@example.com',
          name: 'Name',
          picture: 'https://pic.net',
        };

        const mockedToken = 'token';
        const mockedCookies = { token: mockedToken };
        const mockedReq = { cookies: mockedCookies };

        const expectedReq = {
          ...mockedReq,
        };
        const expectedStatus = 401;

        // Act
        await withAuthApi(mockedHandler, mockedDb)(
          mockedReq as unknown as NextApiRequestWithAuth,
          mockedRes as unknown as NextApiResponse
        );

        // Assert
        expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
        expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
        expect(getError).toHaveBeenCalledWith(expectedStatus);
        expect(mockedReq).toEqual(expectedReq);
      });
    });

    describe('when got no helpersData', () => {
      test('returns 403 error', async () => {
        // Arrange
        userData = {
          email: 'email@example.com',
          name: 'Name',
          picture: 'https://pic.net',
          uid: mockedUid,
        };
        mockedHelpersData = undefined;

        const mockedToken = 'token';
        const mockedCookies = { token: mockedToken };
        const mockedReq = { cookies: mockedCookies };
        const expectedReq = {
          ...mockedReq,
          uid: mockedUid,
          db: mockedDb,
        };
        const expectedStatus = 403;

        // Act
        await withAuthApi(mockedHandler, mockedDb)(
          mockedReq as unknown as NextApiRequestWithAuth,
          mockedRes as unknown as NextApiResponse
        );

        // Assert
        expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
        expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
        expect(getError).toHaveBeenCalledWith(
          expectedStatus,
          'No Helpers data'
        );
        expect(mockedReq).toEqual(expectedReq);
      });
    });

    describe('when helperName passed', () => {
      test('returns handler', async () => {
        // Arrange
        userData = {
          email: 'email@example.com',
          name: 'Name',
          picture: 'https://pic.net',
          uid: mockedUid,
        };
        const notionToken = 'notion-token';
        mockedHelpersData = {
          [helperName]: {
            notionData: { token: notionToken },
            aeroDataBoxData: mockedAeroDataBoxData,
          },
        };

        const mockedToken = 'token';
        const mockedCookies = { token: mockedToken };
        const mockedReq = { cookies: mockedCookies };

        const expectedReq = {
          ...mockedReq,
          uid: mockedUid,
          notionHelperData: {
            token: notionToken,
          },
          db: mockedDb,
          aeroDataBoxHelperData: mockedAeroDataBoxData,
        };

        // Act
        await withAuthApi(
          mockedHandler,
          mockedDb,
          helperName
        )(
          mockedReq as unknown as NextApiRequestWithAuth,
          mockedRes as unknown as NextApiResponse
        );
        // Assert
        expect(mockedStatus).not.toHaveBeenCalled();
        expect(mockedJson).not.toHaveBeenCalled();
        expect(getError).not.toHaveBeenCalled();
        expect(mockedReq).toEqual(expectedReq);
      });

      describe('when got no helperData', () => {
        test('returns 403 error', async () => {
          // Arrange
          userData = {
            email: 'email@example.com',
            name: 'Name',
            picture: 'https://pic.net',
            uid: mockedUid,
          };
          mockedHelpersData = {};

          const mockedToken = 'token';
          const mockedCookies = { token: mockedToken };
          const mockedReq = { cookies: mockedCookies };
          const expectedReq = {
            ...mockedReq,
            uid: mockedUid,
            db: mockedDb,
          };
          const expectedStatus = 403;

          // Act
          await withAuthApi(
            mockedHandler,
            mockedDb,
            helperName
          )(
            mockedReq as unknown as NextApiRequestWithAuth,
            mockedRes as unknown as NextApiResponse
          );

          // Assert
          expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
          expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
          expect(getError).toHaveBeenCalledWith(
            expectedStatus,
            'No Helper data'
          );
          expect(mockedReq).toEqual(expectedReq);
        });
      });

      describe('when got no Notion token', () => {
        test('returns 403 error', async () => {
          // Arrange
          userData = {
            email: 'email@example.com',
            name: 'Name',
            picture: 'https://pic.net',
            uid: mockedUid,
          };
          mockedHelpersData = {
            [helperName]: { notionData: {} },
          };

          const mockedToken = 'token';
          const mockedCookies = { token: mockedToken };
          const mockedReq = { cookies: mockedCookies };
          const expectedReq = {
            ...mockedReq,
            uid: mockedUid,
            db: mockedDb,
          };
          const expectedStatus = 403;

          // Act
          await withAuthApi(
            mockedHandler,
            mockedDb,
            helperName
          )(
            mockedReq as unknown as NextApiRequestWithAuth,
            mockedRes as unknown as NextApiResponse
          );

          // Assert
          expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
          expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
          expect(getError).toHaveBeenCalledWith(
            expectedStatus,
            'No Notion token'
          );
          expect(mockedReq).toEqual(expectedReq);
        });
      });
    });
  });

  describe('when got an error', () => {
    const mockedToken = 'token';
    const mockedCookies = { token: mockedToken };
    const mockedReq = { cookies: mockedCookies };

    beforeEach(() => {
      (getError as unknown as jest.Mock).mockImplementationOnce(() => ({
        error: 'error',
      }));
      withoutError = true;
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('returns error', async () => {
      // Arrange
      const expectedReq = {
        ...mockedReq,
      };
      const expectedStatus = 401;

      // Act
      await withAuthApi(mockedHandler, mockedDb)(
        mockedReq as unknown as NextApiRequestWithAuth,
        mockedRes as unknown as NextApiResponse
      );

      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
      expect(getError).toHaveBeenCalledWith(expectedStatus, mockedErrorCode);
      expect(mockedReq).toEqual(expectedReq);
    });

    describe('when internal auth error', () => {
      test('returns 500 error', async () => {
        // Arrange
        const expectedReq = {
          ...mockedReq,
        };
        const expectedStatus = 500;
        mockedErrorCode = 'auth/internal-error';

        // Act
        await withAuthApi(mockedHandler, mockedDb)(
          mockedReq as unknown as NextApiRequestWithAuth,
          mockedRes as unknown as NextApiResponse
        );

        // Assert
        expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
        expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
        expect(getError).toHaveBeenCalledWith(expectedStatus, mockedErrorCode);
        expect(mockedReq).toEqual(expectedReq);
      });
    });
  });
});
