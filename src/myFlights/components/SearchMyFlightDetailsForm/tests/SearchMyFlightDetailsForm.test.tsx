import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import AircraftForm from '@/myFlights/components/AircraftForm';
import AirportForm from '@/myFlights/components/AirportForm';
import FlightForm from '@/myFlights/components/FlightForm';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import MockedAircraftForm from '@/myFlights/components/AircraftForm/mocks';
import MockedAirportForm from '@/myFlights/components/AirportForm/mocks';
import MockedFlightForm from '@/myFlights/components/FlightForm/mocks';

import { mockedDeserializedFlights } from '@/avia/types/avia/mocks';

import SearchMyFlightDetailsForm from '../SearchMyFlightDetailsForm';

jest.mock('@/myFlights/components/AircraftForm');
jest.mock('@/myFlights/components/AirportForm');
jest.mock('@/myFlights/components/FlightForm');
jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');

describe('SearchMyFlightDetailsForm', () => {
  beforeEach(() => {
    (AircraftForm as unknown as jest.Mock).mockImplementation(
      MockedAircraftForm
    );
    (AirportForm as unknown as jest.Mock).mockImplementation(MockedAirportForm);
    (FlightForm as unknown as jest.Mock).mockImplementation(MockedFlightForm);
  });

  afterEach(() => {
    jest.fn();
  });

  test('renders successfully', () => {
    // Arange
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ flightsResult: {} }))
    );
    // Act
    const { baseElement } = renderWithTheme(<SearchMyFlightDetailsForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when flight details received', () => {
    test('renders successfully', () => {
      // Arange
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          flightsResult: { chosenFlight: mockedDeserializedFlights[0] },
        }))
      );
      // Act
      const { baseElement } = renderWithTheme(<SearchMyFlightDetailsForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
