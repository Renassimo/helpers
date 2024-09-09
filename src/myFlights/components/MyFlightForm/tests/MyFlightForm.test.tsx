import renderWithTheme from '@/common/tests/helpers/renderWithTheme';
import { Avia } from '@/avia/types/avia';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';
import useInputValue from '@/common/hooks/useInputValue';

import DateInput from '@/common/components/DateInput';
import FreeAutoComplete from '@/common/components/FreeAutoComplete';
import ClearableInput from '@/common/components/ClearableInput';

import MockedDateInput from '@/common/components/DateInput/mocks';
import MockedFreeAutoComplete from '@/common/components/FreeAutoComplete/mocks';
import MockedClearableInput from '@/common/components/ClearableInput/mocks';

import MyFlightForm from '../MyFlightForm';

jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/common/hooks/useInputValue');
jest.mock('@/common/components/DateInput');
jest.mock('@/common/components/FreeAutoComplete');
jest.mock('@/common/components/ClearableInput');

describe('MyFlightForm', () => {
  const options: Avia.Options = {
    airlines: ['Airline 1', 'Airline 2'],
    airports: ['Airport 3', 'Airport 4'],
    manufacturers: ['Manufacturer 5', 'Manufacturers 6'],
    models: ['Model 7', 'Model 8'],
  };
  const matchers: Avia.Matchers = {
    airlines: { 'Airline 1': 'Airline 2' },
    airports: { 'Airport 3': 'Airport 4' },
    manufacturers: { 'Manufacturer 5': 'Manufacturers 6' },
    models: { 'Model 7': 'Model 8' },
  };

  beforeEach(() => {
    (DateInput as unknown as jest.Mock).mockImplementation(MockedDateInput);
    (FreeAutoComplete as unknown as jest.Mock).mockImplementation(
      MockedFreeAutoComplete
    );
    (ClearableInput as unknown as jest.Mock).mockImplementation(
      MockedClearableInput
    );
  });

  test('renders successfully with empty values', () => {
    // Arange
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        options,
        matchers,
        loadedValues: {},
      }))
    );
    (useInputValue as unknown as jest.Mock).mockImplementation(
      jest.fn(() => [{}, jest.fn()])
    );
    // Act
    const { baseElement } = renderWithTheme(<MyFlightForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when loaded values passed', () => {
    test('renders successfully with empty values', () => {
      // Arange
      const loadedValuesInState = {
        date: 'loadedValues.date',
        flightNumber: 'loadedValues.flightNumber',
        registration: 'loadedValues.registration',
        cn: 'loadedValues.cn',
        firstFlight: 'loadedValues.firstFlight',
        airplaneName: 'loadedValues.airplaneName',
        originName: 'loadedValues.originName',
        destinationName: 'loadedValues.destinationName',
        seatNumber: 'loadedValues.seatNumber',
        altAirline: 'loadedValues.altAirline',
        altFlightNumber: 'loadedValues.altFlightNumber',
        planespottersUrl: 'loadedValues.planespottersUrl',
        distance: 'loadedValues.distance',
        age: 'loadedValues.age',
        photoUrl: 'loadedValues.photoUrl',
      };
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          options,
          matchers,
          loadedValues: {
            ...loadedValuesInState,
            model: 'loadedValues.model',
            manufacturer: 'loadedValues.manufacturer',
            destination: 'loadedValues.destination',
            origin: 'loadedValues.origin',
            airline: 'loadedValues.airline',
          },
        }))
      );
      let setStateResult: any = {};
      const mockedSetState = jest.fn((fn) => {
        setStateResult = fn({});
      });
      (useInputValue as unknown as jest.Mock).mockImplementation(
        jest.fn(() => [{}, mockedSetState])
      );
      // Act
      const { baseElement } = renderWithTheme(<MyFlightForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(setStateResult).toEqual(loadedValuesInState);
    });
  });
});
