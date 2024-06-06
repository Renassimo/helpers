import { NextApiRequestWithAuth } from '@/auth/types';
import { NextApiResponse } from 'next';

import handler from '../../api/create';

import PlaysService from '@/gameMaps/services/plays';
import { getError } from '@/common/utils/errors';

import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';

jest.mock('@/gameMaps/services/plays');
jest.mock('@/common/utils/errors');

describe('create (play)', () => {
  const mockedMethod = 'POST';
  const mockedUid = 'uid';
  const mockedGameId = mockedGame.id;
  const mockedQuery = { gameId: mockedGameId };
  const mockedAttributes = mockedPlay.attributes;
  const mockedBody = { data: { attributes: mockedAttributes } };
  const mockedDb = 'mockedDb';
  const mockedData = { ...mockedPlay };
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const req = {
    method: mockedMethod,
    uid: mockedUid,
    body: mockedBody,
    db: mockedDb,
    query: mockedQuery,
  } as unknown as NextApiRequestWithAuth;
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  let mockedCreate = jest.fn(() => mockedData);
  const mockedGetInstance = jest.fn(() => ({
    create: mockedCreate,
  }));

  beforeEach(() => {
    (PlaysService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('writes status and data to response', async () => {
    // Arange
    mockedCreate = jest.fn(() => mockedData);
    // Act
    await handler(req, res);
    // Assert
    expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
    expect(mockedCreate).toHaveBeenCalledWith(
      mockedUid,
      mockedGameId,
      mockedAttributes
    );
    expect(mockedStatus).toHaveBeenCalledWith(201);
    expect(mockedJson).toHaveBeenCalledWith({ data: mockedData });
  });

  describe('when get error', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedErrorMessage = 'New Error';
      mockedCreate = jest.fn(() => {
        throw Error(mockedErrorMessage);
      });

      const expectedError = {
        error: 'expectedError',
      };
      const expectedStatusNumber = 500;

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(req, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(
        expectedStatusNumber,
        mockedErrorMessage
      );
    });
  });

  describe('when method is not allowed', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedReq = {
        ...req,
        method: 'GET',
      } as unknown as NextApiRequestWithAuth;
      mockedCreate = jest.fn(() => mockedData);

      const expectedStatusNumber = 405;
      const expectedError = {
        error: 'expectedError',
      };
      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(expectedStatusNumber);
    });
  });
});
