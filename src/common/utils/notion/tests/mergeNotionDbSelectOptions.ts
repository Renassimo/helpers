import { mockedFlightsDb } from '@/myFlights/types/mocks';
import { mockedSpottingDb } from '@/spotting/types/mocks';

import mergeNotionDbSelectOptions from '../mergeNotionDbSelectOptions';

describe('mergeNotionDbSelectOptions', () => {
  test('merges flights and spotting options', () => {
    // Arange
    const expectedResult = {
      airlines: ['Airline 1', 'Airline 2', 'Airline 3', 'Airline 4'],
      airports: ['Airport 1', 'Airport 2', 'Airport 3', 'Airport 4'],
      manufacturers: ['Manufacturer 1', 'Manufacturer 2', 'Manufacturer 3'],
      models: ['Model 1', 'Model 2', 'Model 3'],
    };
    // Act
    const result = mergeNotionDbSelectOptions(
      [mockedFlightsDb.properties, mockedSpottingDb.properties],
      {
        airlines: [['Airline', 'Alt airline'], ['Carrier']],
        airports: [['Origin', 'Destination'], ['Place']],
        manufacturers: [['Manufacturer'], ['Manufacturer']],
        models: [['Model'], ['Model']],
      }
    );
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
