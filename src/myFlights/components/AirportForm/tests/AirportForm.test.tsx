import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { UseAirportsResult } from '@/myFlights/types';

import useInputValue from '@/common/hooks/useInputValue';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import useAlerts from '@/common/hooks/alerts/useAlerts';

import geoLocation from '@/common/utils/geoLocation';

import AviaInput from '@/avia/components/AviaInput';
import AircraftCard from '@/myFlights/components/AircraftCard';

import MockedAviaInput from '@/avia/components/AviaInput/mocks';
import MockedAircraftCard from '@/myFlights/components/AircraftCard/mocks';

import { mockedDeserializedAirports } from '@/avia/types/avia/mocks';

import AirportForm from '../AirportForm';

jest.mock('@/common/hooks/useInputValue');
jest.mock('@/avia/components/AviaInput');
jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/myFlights/components/AircraftCard');
jest.mock('@/common/hooks/alerts/useAlerts');
jest.mock('@/common/utils/geoLocation');

describe('AirportForm', () => {
  const mockedSetValue = jest.fn();
  const mockUseInputValue = (value = '') =>
    jest.fn(() => [value, mockedSetValue]);

  const mockedCreateErrorAlert = jest.fn();

  const retreiveAirports = jest.fn();
  const chooseAirport = jest.fn();
  const clearChosenAirport = jest.fn();

  const originsResult = {
    airports: mockedDeserializedAirports,
    chosenAirports: mockedDeserializedAirports[0],
    retreiveAirports,
    chooseAirport,
    clearChosenAirport,
    loading: false,
  } as unknown as UseAirportsResult;

  const mockUseMyFlightsContext = (props: Partial<UseAirportsResult> = {}) =>
    jest.fn(() => ({ originsResult: { ...originsResult, ...props } }));

  beforeEach(() => {
    (AviaInput as unknown as jest.Mock).mockImplementation(MockedAviaInput);
    (AircraftCard as unknown as jest.Mock).mockImplementation(
      MockedAircraftCard
    );
    (useAlerts as unknown as jest.Mock).mockImplementation(() => ({
      createErrorAlert: mockedCreateErrorAlert,
    }));
    (geoLocation as unknown as jest.Mock).mockImplementation(
      jest.fn((cb1, cb2, cb3, cb4) => {
        cb1({
          coords: {
            latitude: '11',
            longitude: '22',
          },
        });
        cb2({ message: 'error-msg' });
        cb3('not-supported-error-msg');
        cb4();
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    (useInputValue as unknown as jest.Mock).mockImplementation(
      mockUseInputValue()
    );
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      mockUseMyFlightsContext()
    );
    // Act
    const { baseElement } = renderWithTheme(<AirportForm title="Origin" />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when no chosenAirport', () => {
    const contextProps = { chosenAirport: null };

    test('renders successfully', () => {
      // Arange
      (useInputValue as unknown as jest.Mock).mockImplementation(
        mockUseInputValue()
      );
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        mockUseMyFlightsContext(contextProps)
      );
      // Act
      const { baseElement } = renderWithTheme(<AirportForm title="Origin" />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when clicks to search by location', () => {
      test('calls retreiveAirports', async () => {
        // Arange
        (useInputValue as unknown as jest.Mock).mockImplementation(
          mockUseInputValue()
        );
        (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
          mockUseMyFlightsContext(contextProps)
        );
        const { getByLabelText, baseElement } = renderWithTheme(
          <AirportForm title="Origin" />
        );
        // Act
        await userEvent.click(getByLabelText('By Location'));
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(geoLocation).toBeCalled();
        expect(retreiveAirports).toBeCalledWith({ lat: '11', lon: '22' });
        expect(mockedCreateErrorAlert).toBeCalledTimes(2);
        expect(mockedCreateErrorAlert).toHaveBeenNthCalledWith(1, 'error-msg');
        expect(mockedCreateErrorAlert).toHaveBeenNthCalledWith(
          2,
          'not-supported-error-msg'
        );
        expect(mockedSetValue).toBeCalledWith('');
      });
    });

    describe('and when value is not empty', () => {
      const value = 'Val';

      test('renders successfully', async () => {
        // Arange
        (useInputValue as unknown as jest.Mock).mockImplementation(
          mockUseInputValue(value)
        );
        (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
          mockUseMyFlightsContext(contextProps)
        );
        // Act
        const { baseElement } = renderWithTheme(<AirportForm title="Origin" />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('and value length higher than 4 symbols', () => {
        test('renders successfully', async () => {
          // Arange
          (useInputValue as unknown as jest.Mock).mockImplementation(
            mockUseInputValue('value')
          );
          (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
            mockUseMyFlightsContext(contextProps)
          );
          // Act
          const { baseElement } = renderWithTheme(
            <AirportForm title="Origin" />
          );
          // Assert
          expect(baseElement).toMatchSnapshot();
        });
      });

      describe('and clicks to search by code', () => {
        test('calls retreiveAirports', async () => {
          // Arange
          (useInputValue as unknown as jest.Mock).mockImplementation(
            mockUseInputValue(value)
          );
          (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
            mockUseMyFlightsContext(contextProps)
          );
          const { getByLabelText } = renderWithTheme(
            <AirportForm title="Origin" />
          );
          // Act
          await userEvent.click(getByLabelText('By Code'));
          // Assert
          expect(retreiveAirports).toBeCalledWith({ code: 'Val' });
        });
      });

      describe('and clicks to search by text', () => {
        test('calls retreiveAirports', async () => {
          // Arange
          (useInputValue as unknown as jest.Mock).mockImplementation(
            mockUseInputValue(value)
          );
          (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
            mockUseMyFlightsContext(contextProps)
          );
          const { getByLabelText } = renderWithTheme(
            <AirportForm title="Origin" />
          );
          // Act
          await userEvent.click(getByLabelText('By Text'));
          // Assert
          expect(retreiveAirports).toBeCalledWith({ text: 'Val' });
        });
      });
    });
  });

  describe('when no aircrafts', () => {
    test('renders successfully', () => {
      // Arange
      (useInputValue as unknown as jest.Mock).mockImplementation(
        mockUseInputValue()
      );
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        mockUseMyFlightsContext({ chosenAirport: null, airports: null })
      );
      // Act
      const { baseElement } = renderWithTheme(<AirportForm title="Origin" />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
