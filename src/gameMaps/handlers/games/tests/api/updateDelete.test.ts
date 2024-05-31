import GamesService from '@/gameMaps/services/games';
import { getError } from '@/common/utils/errors';

import { mockedGame } from '@/gameMaps/types/mocks';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import handler from '../../api/updateDelete';

jest.mock('@/gameMaps/services/games');
jest.mock('@/common/utils/errors');

describe('updateDelete', () => {
  const mockedMethod = 'PATCH';
  const mockedUid = 'uid';
  const mockedAttributes = mockedGame.attributes;
  const mockedBody = { data: { attributes: mockedAttributes } };
  const mockedQuery = { id: mockedGame.id };
  const mockedDb = 'mockedDb';
  const mockedData = { ...mockedGame };
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const req = {
    method: mockedMethod,
    uid: mockedUid,
    body: mockedBody,
    query: mockedQuery,
    db: mockedDb,
  } as unknown as NextApiRequestWithAuth;
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  let mockedUpdate = jest.fn(() => mockedData);
  const mockedDelete = jest.fn();
  const mockedGetInstance = jest.fn(() => ({
    update: mockedUpdate,
    delete: mockedDelete,
  }));

  beforeEach(() => {
    (GamesService.getInstance as unknown as jest.Mock).mockImplementationOnce(
      mockedGetInstance
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when method is PATCH', () => {
    test('writes status and data to response', async () => {
      // Arange
      mockedUpdate = jest.fn(() => mockedData);
      // Act
      await handler(req, res);
      // Assert
      expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedUpdate).toHaveBeenCalledWith(
        mockedUid,
        mockedGame.id,
        mockedAttributes
      );
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({ data: mockedData });
    });
  });

  describe('when method is DELETE', () => {
    const mockedMethod = 'DELETE';
    const mockedReq = {
      ...req,
      method: mockedMethod,
    } as unknown as NextApiRequestWithAuth;

    test('writes status to response', async () => {
      // Arange
      mockedUpdate = jest.fn(() => mockedData);
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedDelete).toHaveBeenCalledWith(mockedUid, mockedGame.id);
      expect(mockedStatus).toHaveBeenCalledWith(204);
      expect(mockedJson).toHaveBeenCalledWith({});
    });
  });

  describe('when get error', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedErrorMessage = 'New Error';
      mockedUpdate = jest.fn(() => {
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
      mockedUpdate = jest.fn(() => mockedData);

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
