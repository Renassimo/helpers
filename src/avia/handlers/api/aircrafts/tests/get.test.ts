import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

import handler from '../get';

import { getError } from '@/common/utils/errors';

import AeroDataBoxService from '@/avia/services/aeroDataBox';
import { deserializeAircrafts } from '@/avia/serializers/aeroDataBox';

import { mockedAircrafts } from '@/avia/types/aeroDataBox/mocks';
import { mockedDeserializedFlights } from '@/avia/types/avia/mocks';

jest.mock('@/common/utils/errors');

jest.mock('@/avia/services/aeroDataBox');
jest.mock('@/avia/serializers/aeroDataBox');

describe('get (aircrafts)', () => {
  const mockedMethod = 'GET';
  const mockedReg = 'registration';
  const mockedQuery = { reg: mockedReg };
  const mockedJson = jest.fn();
  const mockedStatus = jest.fn(() => ({
    json: mockedJson,
  }));
  const mockedXRapidapiKey = 'xRapidapiKey';
  const mockedAeroDataBoxHelperData = { xRapidapiKey: mockedXRapidapiKey };
  const req = {
    method: mockedMethod,
    query: mockedQuery,
    aeroDataBoxHelperData: mockedAeroDataBoxHelperData,
  } as unknown as NextApiRequestWithAuth;
  const res = {
    status: mockedStatus,
  } as unknown as NextApiResponse;

  let mockedRetreiveAircrafts = jest.fn(() => mockedAircrafts);

  const mockedAeroDataBoxServiceConstructor = jest.fn(() => ({
    retrieveAircrafts: mockedRetreiveAircrafts,
  }));

  const mockedDeserializeAircrafts = jest.fn(() => mockedDeserializedFlights);

  beforeEach(() => {
    (AeroDataBoxService as unknown as jest.Mock).mockImplementationOnce(
      mockedAeroDataBoxServiceConstructor
    );
    (deserializeAircrafts as unknown as jest.Mock).mockImplementationOnce(
      mockedDeserializeAircrafts
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('writes status and data to response', async () => {
    // Arange
    mockedRetreiveAircrafts = jest.fn(() => mockedAircrafts);
    // Act
    await handler(req, res);
    // Assert
    expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
    expect(mockedRetreiveAircrafts).toHaveBeenCalledWith(mockedReg);
    expect(mockedDeserializeAircrafts).toHaveBeenCalledWith(mockedAircrafts);
    expect(mockedStatus).toHaveBeenCalledWith(200);
    expect(mockedJson).toHaveBeenCalledWith({
      data: mockedDeserializedFlights,
    });
  });

  describe('when receives empty array', () => {
    test('writes status and 404 error to response', async () => {
      // Arange
      const mockedErrorMessage = 'Not found.';
      const mockedData = [] as AeroDataBoxApi.Aircraft[];
      mockedRetreiveAircrafts = jest.fn(() => mockedData);
      const expectedStatusNumber = 404;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(req, res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAircrafts).toHaveBeenCalledWith(mockedReg);
      expect(mockedDeserializeAircrafts).not.toHaveBeenCalled();
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(
        expectedStatusNumber,
        mockedErrorMessage
      );
    });
  });

  describe('when receives error in data', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedErrorMessage = 'Something went wrong.';
      const mockedData = {
        message: mockedErrorMessage,
      } as unknown as AeroDataBoxApi.Aircraft[];
      mockedRetreiveAircrafts = jest.fn(() => mockedData);
      const expectedStatusNumber = 500;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(req, res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveAircrafts).toHaveBeenCalledWith(mockedReg);
      expect(mockedDeserializeAircrafts).not.toHaveBeenCalled();
      expect(mockedStatus).toHaveBeenCalledWith(expectedStatusNumber);
      expect(mockedJson).toHaveBeenCalledWith(expectedError);
      expect(mockedGetError).toHaveBeenCalledWith(
        expectedStatusNumber,
        mockedErrorMessage
      );
    });
  });

  describe('when get error', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedErrorMessage = 'New Error';
      mockedRetreiveAircrafts = jest.fn(() => {
        throw Error(mockedErrorMessage);
      });

      const expectedStatusNumber = 500;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);

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
      mockedRetreiveAircrafts = jest.fn(() => mockedAircrafts);

      const expectedStatusNumber = 405;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);
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
