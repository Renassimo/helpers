import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { Avia } from '@/avia/types/avia';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import DateInput from '@/common/components/DatePickers/DateInput';
import FreeAutoComplete from '@/common/components/FreeAutoComplete';
import ClearableInput from '@/common/components/ClearableInput';

import MockedDateInput from '@/common/components/DatePickers/DateInput/mocks';
import MockedFreeAutoComplete from '@/common/components/FreeAutoComplete/mocks';
import MockedClearableInput from '@/common/components/ClearableInput/mocks';

import MyFlightForm from '../MyFlightForm';

jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/common/components/DatePickers/DateInput');
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
  const onDelete = jest.fn();
  const setValue = jest.fn();
  const myFlightsContext = {
    options,
    matchers,
    loadedValues: {},
    myFlightForm: {
      state: {},
      setValue,
      isEditing: false,
      loading: false,
      onDelete,
    },
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
      jest.fn(() => myFlightsContext)
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
          ...myFlightsContext,
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
      // Act
      const { baseElement } = renderWithTheme(<MyFlightForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when state values passed', () => {
    test('renders successfully with empty values', () => {
      // Arange
      const state = {
        date: 'state.date',
        flightNumber: 'state.flightNumber',
        registration: 'state.registration',
        cn: 'state.cn',
        firstFlight: 'state.firstFlight',
        airplaneName: 'state.airplaneName',
        originName: 'state.originName',
        destinationName: 'state.destinationName',
        seatNumber: 'state.seatNumber',
        altAirline: 'state.altAirline',
        altFlightNumber: 'state.altFlightNumber',
        planespottersUrl: 'state.planespottersUrl',
        distance: 'state.distance',
        age: 'state.age',
        photoUrl: 'state.photoUrl',
      };
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          ...myFlightsContext,
          myFlightForm: { ...myFlightsContext.myFlightForm, state },
        }))
      );
      // Act
      const { baseElement } = renderWithTheme(<MyFlightForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when clicks delete button', () => {
    test('calls onDelete', async () => {
      // Arange
      const state = {
        date: 'state.date',
        flightNumber: 'state.flightNumber',
        registration: 'state.registration',
        cn: 'state.cn',
        firstFlight: 'state.firstFlight',
        airplaneName: 'state.airplaneName',
        originName: 'state.originName',
        destinationName: 'state.destinationName',
        seatNumber: 'state.seatNumber',
        altAirline: 'state.altAirline',
        altFlightNumber: 'state.altFlightNumber',
        planespottersUrl: 'state.planespottersUrl',
        distance: 'state.distance',
        age: 'state.age',
        photoUrl: 'state.photoUrl',
      };
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          ...myFlightsContext,
          myFlightForm: {
            ...myFlightsContext.myFlightForm,
            state,
            isEditing: true,
          },
        }))
      );
      const { getByText } = renderWithTheme(<MyFlightForm />);
      // Act
      await userEvent.click(getByText('Delete'));
      // Assert
      expect(onDelete).toBeCalled();
    });
  });
});
