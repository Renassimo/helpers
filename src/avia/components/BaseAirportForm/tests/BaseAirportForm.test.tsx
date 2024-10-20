import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useStateValue from '@/common/hooks/useStateValue';

import useAlerts from '@/common/hooks/alerts/useAlerts';

import geoLocation from '@/common/utils/geoLocation';

import { Avia } from '@/avia/types/avia';

import AviaInput from '@/avia/components/AviaInput';
import AircraftCard from '@/avia/components/AircraftCard';

import MockedAviaInput from '@/avia/components/AviaInput/mocks';
import MockedAircraftCard from '@/avia/components/AircraftCard/mocks';

import { mockedDeserializedAirports } from '@/avia/types/avia/mocks';

import BaseAirportForm from '../BaseAirportForm';

jest.mock('@/common/hooks/useStateValue');
jest.mock('@/avia/components/AviaInput');
jest.mock('@/avia/components/AircraftCard');
jest.mock('@/common/hooks/alerts/useAlerts');
jest.mock('@/common/utils/geoLocation');

describe('BaseAirportForm', () => {
  const mockedSetValue = jest.fn();
  const mockUseStateValue = (value = '') =>
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
  } as unknown as Avia.AirportsResult;

  const getAirportsResult = (props: Partial<Avia.AirportsResult> = {}) => ({
    ...originsResult,
    ...props,
  });

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
    (useStateValue as unknown as jest.Mock).mockImplementation(
      mockUseStateValue()
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <BaseAirportForm title="Origin" airportsResult={getAirportsResult()} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when no chosenAirport', () => {
    const contextProps = { chosenAirport: null };

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <BaseAirportForm
          title="Origin"
          airportsResult={getAirportsResult(contextProps)}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when clicks to search by location', () => {
      test('calls retreiveAirports', async () => {
        // Arange
        const { getByLabelText, baseElement } = renderWithTheme(
          <BaseAirportForm
            title="Origin"
            airportsResult={getAirportsResult(contextProps)}
          />
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
        (useStateValue as unknown as jest.Mock).mockImplementation(
          mockUseStateValue(value)
        );
        // Act
        const { baseElement } = renderWithTheme(
          <BaseAirportForm
            title="Origin"
            airportsResult={getAirportsResult(contextProps)}
          />
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('and value length higher than 4 symbols', () => {
        test('renders successfully', async () => {
          // Arange
          (useStateValue as unknown as jest.Mock).mockImplementation(
            mockUseStateValue('value')
          );
          // Act
          const { baseElement } = renderWithTheme(
            <BaseAirportForm
              title="Origin"
              airportsResult={getAirportsResult(contextProps)}
            />
          );
          // Assert
          expect(baseElement).toMatchSnapshot();
        });
      });

      describe('and clicks to search by code', () => {
        test('calls retreiveAirports', async () => {
          // Arange
          (useStateValue as unknown as jest.Mock).mockImplementation(
            mockUseStateValue(value)
          );
          const { getByLabelText } = renderWithTheme(
            <BaseAirportForm
              title="Origin"
              airportsResult={getAirportsResult(contextProps)}
            />
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
          (useStateValue as unknown as jest.Mock).mockImplementation(
            mockUseStateValue(value)
          );
          const { getByLabelText } = renderWithTheme(
            <BaseAirportForm
              title="Origin"
              airportsResult={getAirportsResult(contextProps)}
            />
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
      // Act
      const { baseElement } = renderWithTheme(
        <BaseAirportForm
          title="Origin"
          airportsResult={getAirportsResult({
            chosenAirport: null,
            airports: null,
          })}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
