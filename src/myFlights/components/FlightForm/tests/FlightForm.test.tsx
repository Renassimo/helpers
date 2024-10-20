import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { UseFlightsResult } from '@/myFlights/types';

import useStateValue from '@/common/hooks/useStateValue';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import AviaInput from '@/avia/components/AviaInput';
import DatePicker from '@/common/components/DatePickers/DateInput';
import FlightCard from '@/myFlights/components/FlightCard';

import MockedAviaInput from '@/avia/components/AviaInput/mocks';
import MockedDateInput from '@/common/components/DatePickers/DateInput/mocks';
import MockedFlightCard from '@/myFlights/components/FlightCard/mocks';

import { mockedDeserializedFlights } from '@/avia/types/avia/mocks';

import FlightForm from '../FlightForm';

jest.mock('@/common/hooks/useStateValue');
jest.mock('@/avia/components/AviaInput');
jest.mock('@/common/components/DatePickers/DateInput');
jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/myFlights/components/FlightCard');

describe('FlightForm', () => {
  const mockedSetValue = jest.fn();
  const mockUseStateValue = (value: any = '') =>
    jest.fn(() => [value, mockedSetValue]);

  const retreiveFlights = jest.fn();
  const chooseFlight = jest.fn();
  const clearChosenFlight = jest.fn();

  const flightsResult = {
    flights: [mockedDeserializedFlights[0], mockedDeserializedFlights[0]],
    chosenFlight: mockedDeserializedFlights[0],
    retreiveFlights,
    chooseFlight,
    clearChosenFlight,
    loading: false,
  } as unknown as UseFlightsResult;

  const mockUseMyFlightsContext = (props: Partial<UseFlightsResult> = {}) =>
    jest.fn(() => ({ flightsResult: { ...flightsResult, ...props } }));

  beforeEach(() => {
    (AviaInput as unknown as jest.Mock).mockImplementation(MockedAviaInput);
    (DatePicker as unknown as jest.Mock).mockImplementation(MockedDateInput);
    (FlightCard as unknown as jest.Mock).mockImplementation(MockedFlightCard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    (useStateValue as unknown as jest.Mock).mockImplementationOnce(
      mockUseStateValue()
    );
    (useStateValue as unknown as jest.Mock).mockImplementationOnce(
      mockUseStateValue(null)
    );
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      mockUseMyFlightsContext()
    );
    // Act
    const { baseElement } = renderWithTheme(<FlightForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when no chosenFlight', () => {
    const contextProps = { chosenFlight: null };

    test('renders successfully', () => {
      // Arange
      (useStateValue as unknown as jest.Mock).mockImplementationOnce(
        mockUseStateValue()
      );
      (useStateValue as unknown as jest.Mock).mockImplementationOnce(
        mockUseStateValue(null)
      );
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        mockUseMyFlightsContext(contextProps)
      );
      // Act
      const { baseElement } = renderWithTheme(<FlightForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and when value is not empty', () => {
      const value = 'Val';
      const flightDate = 'flight-date';

      test('renders successfully', async () => {
        // Arange
        (useStateValue as unknown as jest.Mock).mockImplementationOnce(
          mockUseStateValue(value)
        );
        (useStateValue as unknown as jest.Mock).mockImplementationOnce(
          mockUseStateValue(null)
        );
        (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
          mockUseMyFlightsContext(contextProps)
        );
        // Act
        const { baseElement } = renderWithTheme(<FlightForm />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('and clicks to search', () => {
        test('calls retreiveFlights', async () => {
          // Arange
          (useStateValue as unknown as jest.Mock).mockImplementationOnce(
            mockUseStateValue(value)
          );
          (useStateValue as unknown as jest.Mock).mockImplementationOnce(
            mockUseStateValue(null)
          );
          (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
            mockUseMyFlightsContext(contextProps)
          );
          const { getByLabelText } = renderWithTheme(<FlightForm />);
          // Act
          await userEvent.click(getByLabelText('Search'));
          // Assert
          expect(retreiveFlights).toBeCalledWith('Val', null);
        });

        describe('and flight date was set', () => {
          test('calls retreiveFlights', async () => {
            // Arange
            (useStateValue as unknown as jest.Mock).mockImplementationOnce(
              mockUseStateValue(value)
            );
            (useStateValue as unknown as jest.Mock).mockImplementationOnce(
              mockUseStateValue('flight-date')
            );
            (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
              mockUseMyFlightsContext(contextProps)
            );
            const { getByLabelText } = renderWithTheme(<FlightForm />);
            // Act
            await userEvent.click(getByLabelText('Search'));
            // Assert
            expect(retreiveFlights).toBeCalledWith('Val', flightDate);
          });
        });
      });
    });
  });

  describe('when no aircrafts', () => {
    test('renders successfully', () => {
      // Arange
      (useStateValue as unknown as jest.Mock).mockImplementationOnce(
        mockUseStateValue()
      );
      (useStateValue as unknown as jest.Mock).mockImplementationOnce(
        mockUseStateValue(null)
      );
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        mockUseMyFlightsContext({ chosenFlight: null, flights: null })
      );
      // Act
      const { baseElement } = renderWithTheme(<FlightForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
