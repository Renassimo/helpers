import NotionService from '@/common/services/notion';

import updateSpottedPlanes from '@/spotting/handlers/updateSpottedPlanes';
import { getError } from '@/common/utils/errors';

import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';

import handler from '../../api/update';

jest.mock('@/common/services/notion');
jest.mock('@/spotting/handlers/updateSpottedPlanes');
jest.mock('@/common/utils/errors');

describe('updateDelete', () => {
  const mockedMethod = 'PATCH';
  const mockedToken = 'mocked token';
  const mockedNotionHelperData = { token: mockedToken };
  const mockedStatusCode = 200;
  const mockedRequestBody = 'mocked request body';
  const mockedResponseBody = { data: 'mockedResponseBodyData' };
  const mockedErrorMessage = 'Error message';

  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const req = {
    method: mockedMethod,
    body: mockedRequestBody,
    notionHelperData: mockedNotionHelperData,
  } as unknown as NextApiRequestWithAuth;
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  const mockedNotionServiceInstance = {
    someMethod: 'mockedNotionServiceMethod',
  };
  const mockedNotionServiceConstructor = jest.fn(
    () => mockedNotionServiceInstance
  );

  beforeEach(() => {
    (NotionService as unknown as jest.Mock).mockImplementationOnce(
      mockedNotionServiceConstructor
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('writes status and data to response', async () => {
    // Arange
    const mockedUpdateSpottedPlanes = jest.fn(() => ({
      status: mockedStatusCode,
      responseBody: mockedResponseBody,
    }));
    (updateSpottedPlanes as unknown as jest.Mock).mockImplementationOnce(
      mockedUpdateSpottedPlanes
    );
    // Act
    await handler(req, res);
    // Assert
    expect(mockedNotionServiceConstructor).toHaveBeenCalledWith(mockedToken);
    expect(mockedUpdateSpottedPlanes).toHaveBeenCalledWith(
      mockedNotionServiceInstance,
      mockedRequestBody
    );
    expect(mockedStatus).toHaveBeenCalledWith(mockedStatusCode);
    expect(mockedJson).toHaveBeenCalledWith(mockedResponseBody);
  });

  describe('when get error', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedUpdateSpottedPlanes = jest.fn(() => {
        throw Error(mockedErrorMessage);
      });
      (updateSpottedPlanes as unknown as jest.Mock).mockImplementation(
        mockedUpdateSpottedPlanes
      );

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
