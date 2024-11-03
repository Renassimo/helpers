import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

import NotionService from '@/common/services/notion';
import { getError } from '@/common/utils/errors';

import createPhotoInfo from '../../createPhotoInfo';

import handler from '@/spotting/handlers/api/create';

jest.mock('@/common/services/notion');
jest.mock('@/common/utils/errors');
jest.mock('../../createPhotoInfo');

describe('create photo info handler', () => {
  const mockedData = { status: 200, responseBody: 'mocked-data' };
  const mockedMethod = 'POST';
  const mockedToken = 'mocked token';
  const mockedDbID = 'mocked-data-base-id';
  const mockedNotionHelperData = {
    token: mockedToken,
    dataBaseID: mockedDbID,
  };
  const mockedStatusCode = 200;
  const mockedErrorMessage = 'Error message';

  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const mockedBody = 'req-body';
  const req = {
    method: mockedMethod,
    notionHelperData: mockedNotionHelperData,
    body: mockedBody,
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

  const mockedCreatePhotoInfo = jest.fn(() => mockedData);

  beforeEach(() => {
    (NotionService as unknown as jest.Mock).mockImplementation(
      mockedNotionServiceConstructor
    );
    (createPhotoInfo as unknown as jest.Mock).mockImplementation(
      mockedCreatePhotoInfo
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('writes status and data to response', async () => {
    // Arange
    // Act
    await handler(req, res);
    // Assert
    expect(mockedNotionServiceConstructor).toHaveBeenCalledWith(mockedToken);
    expect(mockedCreatePhotoInfo).toHaveBeenCalledWith(
      mockedNotionServiceInstance,
      mockedDbID,
      mockedBody
    );
    expect(mockedStatus).toHaveBeenCalledWith(mockedStatusCode);
    expect(mockedJson).toHaveBeenCalledWith(mockedData.responseBody);
  });

  describe('when catches error', () => {
    test('writes status and error to response', async () => {
      // Arange
      (mockedCreatePhotoInfo as unknown as jest.Mock).mockImplementation(() => {
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

  describe('when catches notion error', () => {
    test('writes status and error to response', async () => {
      // Arange
      (mockedCreatePhotoInfo as unknown as jest.Mock).mockImplementation(() => {
        throw mockedNotionError418;
      });
      // Act
      await handler(req, res);
      // Assert
      expect(mockedStatus).toHaveBeenCalledWith(418);
      expect(mockedJson).toHaveBeenCalledWith(mockedNotionError418);
    });
  });

  describe('when method is not allowed', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedReq = {
        ...req,
        method: 'PATCH',
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
