import withAuth from '@/lib/middlewares/withAuth';
import { getError } from '@/utils/errors';
import { NextApiRequest, NextApiResponse } from 'next';

let mockedErrorCode: unknown;

jest.mock('@/utils/errors');
jest.mock(
  '@/lib/firebase/auth',
  jest.fn(() => ({
    verifyIdToken: () => {
      throw {
        errorInfo: {
          code: mockedErrorCode,
        },
      };
    },
  }))
);

describe('withAuth error', () => {
  const mockedGetError = { error: 'error' };
  const mockedHandler = jest.fn();
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const mockedToken = 'token';
  const mockedCookies = { token: mockedToken };
  const mockedReq = { cookies: mockedCookies };
  const mockedRes = { status: mockedStatus };

  beforeEach(() => {
    (getError as unknown as jest.Mock).mockImplementationOnce(() => ({
      error: 'error',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns 401 error', async () => {
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
