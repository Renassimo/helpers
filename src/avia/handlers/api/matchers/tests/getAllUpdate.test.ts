import AviaMatchersService from '@/avia/services/AviaMatchers';

import { getError } from '@/common/utils/errors';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import { mockedAviaMatchers } from '@/avia/types/avia/mocks';

import handler from '../getAllUpdate';

jest.mock('@/avia/services/AviaMatchers');
jest.mock('@/common/utils/errors');

describe('getAllUpdate (avia matchers)', () => {
  const mockedMethod = 'GET';
  const mockedUid = 'uid';
  const mockedBody = { data: { airlines: 'airlines matcher' } };
  const mockedDb = 'mockedDb';
  const mockedData = mockedAviaMatchers;
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const req = {
    method: mockedMethod,
    uid: mockedUid,
    body: mockedBody,
    db: mockedDb,
  } as unknown as NextApiRequestWithAuth;
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  let mockedGetAll = jest.fn(() => mockedData);
  let mockedUpdate = jest.fn(() => mockedData);
  const mockedGetInstance = jest.fn(() => ({
    getAll: mockedGetAll,
    update: mockedUpdate,
  }));

  beforeEach(() => {
    (
      AviaMatchersService.getInstance as unknown as jest.Mock
    ).mockImplementationOnce(mockedGetInstance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when nehod is GET', () => {
    test('writes status and data to response (gets all)', async () => {
      // Arange
      mockedGetAll = jest.fn(() => mockedData);
      // Act
      await handler(req, res);
      // Assert
      expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedGetAll).toHaveBeenCalledWith(mockedUid);
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({ data: mockedData });
    });
  });

  describe('when nehod is PATCH', () => {
    const mockedMethod = 'PATCH';
    const mockedReq = {
      ...req,
      method: mockedMethod,
    } as unknown as NextApiRequestWithAuth;

    test('writes status and data to response (update)', async () => {
      // Arange
      mockedUpdate = jest.fn(() => mockedData);
      // Act
      await handler(mockedReq, res);
      // Assert
      expect(mockedGetInstance).toHaveBeenCalledWith(mockedDb);
      expect(mockedUpdate).toHaveBeenCalledWith(mockedUid, mockedBody.data);
      expect(mockedStatus).toHaveBeenCalledWith(200);
      expect(mockedJson).toHaveBeenCalledWith({ data: mockedData });
    });
  });

  describe('when get error', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedErrorMessage = 'New Error';
      mockedGetAll = jest.fn(() => {
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
        method: 'POST',
      } as unknown as NextApiRequestWithAuth;

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
