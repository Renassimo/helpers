import NotionService from '@/common/services/notion';

import { mockedNotionError418 } from '@/common/types/notion/mocks';

import mergeNotionDbSelectOptions from '@/common/utils/notion/mergeNotionDbSelectOptions';

import getOptions from '../getOptions';

jest.mock('@/common/services/notion');
jest.mock('@/common/utils/notion/mergeNotionDbSelectOptions');

describe('getOptions', () => {
  const mockedFlightsDbId = 'flights-db-id';
  const mockedSpottingDbId = 'spotting-db-id';

  const mockedRetreiveDatabase = jest.fn(async (dbId) => {
    let mockedData = { properties: 'mocked-properties' };
    if (dbId === mockedFlightsDbId)
      mockedData = { properties: 'mocked-flights-properties' };
    if (dbId === mockedSpottingDbId)
      mockedData = { properties: 'mocked-spotting-properties' };
    return {
      ok: true,
      data: mockedData,
    };
  });
  const mockedNotionService = { retreiveDatabase: mockedRetreiveDatabase };

  const mockedMegedOptions = 'merged-options';
  const mockedMergeNotionDbSelectOptions = jest.fn(() => mockedMegedOptions);

  beforeEach(() => {
    (mergeNotionDbSelectOptions as unknown as jest.Mock).mockImplementation(
      mockedMergeNotionDbSelectOptions
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns result', async () => {
    // Arange
    // Act
    const result = await getOptions(
      mockedNotionService as unknown as NotionService,
      mockedFlightsDbId,
      mockedSpottingDbId
    );
    // Assert
    expect(result).toEqual(mockedMegedOptions);
    expect(mockedRetreiveDatabase).toHaveBeenCalledTimes(2);
    expect(mockedRetreiveDatabase).toHaveBeenNthCalledWith(
      1,
      mockedFlightsDbId
    );
    expect(mockedRetreiveDatabase).toHaveBeenNthCalledWith(
      2,
      mockedSpottingDbId
    );
    expect(mockedMergeNotionDbSelectOptions).toHaveBeenCalledWith(
      ['mocked-flights-properties', 'mocked-spotting-properties'],
      {
        airlines: [['Airline', 'Alt airline'], ['Carrier']],
        airports: [['Origin', 'Destination'], ['Place']],
        manufacturers: [['Manufacturer'], ['Manufacturer']],
        models: [['Model'], ['Model']],
      }
    );
  });

  describe('when fails retreiving flights db', () => {
    test('throws error', async () => {
      // Arange
      const mockedRetreiveDatabase = jest.fn(async (dbId) => {
        let mockedData;
        let ok = true;

        if (dbId === mockedFlightsDbId) {
          ok = false;
          mockedData = mockedNotionError418;
        }
        if (dbId === mockedSpottingDbId) {
          mockedData = { properties: 'mocked-spotting-properties' };
        }

        return {
          ok,
          data: mockedData,
        };
      });
      const mockedNotionService = { retreiveDatabase: mockedRetreiveDatabase };
      // Act
      let error;
      try {
        await getOptions(
          mockedNotionService as unknown as NotionService,
          mockedFlightsDbId,
          mockedSpottingDbId
        );
      } catch (err) {
        error = err;
      }
      // Assert
      expect(error).toEqual(mockedNotionError418);
      expect(mockedMergeNotionDbSelectOptions).not.toHaveBeenCalled();
    });
  });

  describe('when fails retreiving spotting db', () => {
    test('throws error', async () => {
      // Arange
      const mockedRetreiveDatabase = jest.fn(async (dbId) => {
        let mockedData;
        let ok = true;

        if (dbId === mockedFlightsDbId) {
          mockedData = { properties: 'mocked-flights-properties' };
        }
        if (dbId === mockedSpottingDbId) {
          ok = false;
          mockedData = mockedNotionError418;
        }

        return {
          ok,
          data: mockedData,
        };
      });
      const mockedNotionService = { retreiveDatabase: mockedRetreiveDatabase };
      // Act
      let error;
      try {
        await getOptions(
          mockedNotionService as unknown as NotionService,
          mockedFlightsDbId,
          mockedSpottingDbId
        );
      } catch (err) {
        error = err;
      }
      // Assert
      expect(error).toEqual(mockedNotionError418);
      expect(mockedMergeNotionDbSelectOptions).not.toHaveBeenCalled();
    });
  });

  describe('when fails retreiving spotting db', () => {
    test('throws error', async () => {
      // Arange
      const mockedError = new Error('Error happened');
      (mergeNotionDbSelectOptions as unknown as jest.Mock).mockImplementation(
        () => {
          throw mockedError;
        }
      );
      // Act
      let error;
      try {
        await getOptions(
          mockedNotionService as unknown as NotionService,
          mockedFlightsDbId,
          mockedSpottingDbId
        );
      } catch (err) {
        error = err;
      }
      // Assert
      expect(error).toEqual(mockedError);
    });
  });
});
