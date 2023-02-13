import withAuth from '@/lib/middlewares/withAuth';
import { getError } from '@/utils/errors';
import { NextApiRequest, NextApiResponse } from 'next';

let withoutError: boolean;
let userData: unknown;
let mockedErrorCode: unknown;

jest.mock('@/utils/errors');
jest.mock(
  '@/lib/firebase/auth',
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

describe('withAuth', () => {
  const mockedHandler = jest.fn();
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const mockedGetError = { error: 'error' };
  const mockedRes = { status: mockedStatus };

  describe('when got no errors', () => {
    const mockedUid = 'uid';

    beforeEach(() => {
      (getError as unknown as jest.Mock).mockImplementationOnce(() => ({
        error: 'error',
      }));
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

      const mockedToken = 'token';
      const mockedCookies = { token: mockedToken };
      const mockedReq = { cookies: mockedCookies };

      const expectedReq = {
        ...mockedReq,
        uid: mockedUid,
      };

      // Act
      await withAuth(mockedHandler)(
        mockedReq as unknown as NextApiRequest,
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
        await withAuth(mockedHandler)(
          mockedReq as unknown as NextApiRequest,
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
        await withAuth(mockedHandler)(
          mockedReq as unknown as NextApiRequest,
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
        await withAuth(mockedHandler)(
          mockedReq as unknown as NextApiRequest,
          mockedRes as unknown as NextApiResponse
        );

        // Assert
        expect(mockedStatus).toHaveBeenCalledWith(expectedStatus);
        expect(mockedJson).toHaveBeenCalledWith(mockedGetError);
        expect(getError).toHaveBeenCalledWith(expectedStatus);
        expect(mockedReq).toEqual(expectedReq);
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
      await withAuth(mockedHandler)(
        mockedReq as unknown as NextApiRequest,
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
        await withAuth(mockedHandler)(
          mockedReq as unknown as NextApiRequest,
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
