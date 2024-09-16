import { NextApiResponse } from 'next';
import { NextApiRequestWithAuth } from '@/auth/types';
import { AeroDataBoxApi } from '@/avia/types/aeroDataBox';

import handler from '../get';

import { getError } from '@/common/utils/errors';

import AeroDataBoxService from '@/avia/services/aeroDataBox';
import { deserializeFlights } from '@/avia/serializers/aeroDataBox';

import { mockedFlights } from '@/avia/types/aeroDataBox/mocks';
import { mockedDeserializedFlights } from '@/avia/types/avia/mocks';

jest.mock('@/common/utils/errors');

jest.mock('@/avia/services/aeroDataBox');
jest.mock('@/avia/serializers/aeroDataBox');

describe('get (flights)', () => {
  const mockedMethod = 'GET';
  const mockedNumber = 'number';
  const mockedDate = 'date';
  const mockedQuery = { number: mockedNumber, date: mockedDate };
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

  let mockedRetreiveFlights = jest.fn(() => mockedFlights);

  const mockedAeroDataBoxServiceConstructor = jest.fn(() => ({
    retreiveFlights: mockedRetreiveFlights,
  }));

  const mockedDeserializeFlights = jest.fn(() => mockedDeserializedFlights);

  beforeEach(() => {
    (AeroDataBoxService as unknown as jest.Mock).mockImplementationOnce(
      mockedAeroDataBoxServiceConstructor
    );
    (deserializeFlights as unknown as jest.Mock).mockImplementationOnce(
      mockedDeserializeFlights
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('writes status and data to response', async () => {
    // Arange
    mockedRetreiveFlights = jest.fn(() => mockedFlights);
    // Act
    await handler(req, res);
    // Assert
    expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
    expect(mockedRetreiveFlights).toHaveBeenCalledWith(
      mockedNumber,
      mockedDate
    );
    expect(deserializeFlights).toHaveBeenCalledWith(mockedFlights);
    expect(mockedStatus).toHaveBeenCalledWith(200);
    expect(mockedJson).toHaveBeenCalledWith({
      data: mockedDeserializedFlights,
    });
  });

  describe('when receives empty array in data', () => {
    test('writes status and error to response', async () => {
      // Arange
      const mockedErrorMessage = 'Not found.';
      const mockedData = [] as AeroDataBoxApi.Flight[];
      mockedRetreiveFlights = jest.fn(() => mockedData);
      const expectedStatusNumber = 404;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(req, res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveFlights).toHaveBeenCalledWith(
        mockedNumber,
        mockedDate
      );
      expect(deserializeFlights).not.toHaveBeenCalled();
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
      } as unknown as AeroDataBoxApi.Flight[];
      mockedRetreiveFlights = jest.fn(() => mockedData);
      const expectedStatusNumber = 500;
      const expectedErrorMessage = 'expectedError';
      const expectedError = new Error(expectedErrorMessage);

      const mockedGetError = jest.fn(() => expectedError);
      (getError as unknown as jest.Mock).mockImplementationOnce(mockedGetError);
      // Act
      await handler(req, res);
      // Assert
      expect(AeroDataBoxService).toHaveBeenCalledWith(mockedXRapidapiKey);
      expect(mockedRetreiveFlights).toHaveBeenCalledWith(
        mockedNumber,
        mockedDate
      );
      expect(deserializeFlights).not.toHaveBeenCalled();
      expect(mockedStatus).toHaveBeenCalledWith(500);
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
      mockedRetreiveFlights = jest.fn(() => {
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
      mockedRetreiveFlights = jest.fn(() => mockedFlights);

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
