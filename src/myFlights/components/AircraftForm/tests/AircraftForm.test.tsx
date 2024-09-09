import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { UseAircraftsResult } from '@/myFlights/types';

import useInputValue from '@/common/hooks/useInputValue';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import AviaInput from '@/avia/components/AviaInput';
import AircraftCard from '@/myFlights/components/AircraftCard';

import MockedAviaInput from '@/avia/components/AviaInput/mocks';
import MockedAircraftCard from '@/myFlights/components/AircraftCard/mocks';

import { mockedDeserializedAircrafts } from '@/avia/types/avia/mocks';

import AircraftForm from '../AircraftForm';

jest.mock('@/common/hooks/useInputValue');
jest.mock('@/avia/components/AviaInput');
jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');
jest.mock('@/myFlights/components/AircraftCard');

describe('AircraftForm', () => {
  const mockedSetValue = jest.fn();
  const mockUseInputValue = (value = '') =>
    jest.fn(() => [value, mockedSetValue]);

  const retreiveAircrafts = jest.fn();
  const chooseAircraft = jest.fn();
  const clearChosenAircraft = jest.fn();

  const aircraftsResult = {
    aircrafts: mockedDeserializedAircrafts,
    chosenAircraft: mockedDeserializedAircrafts[0],
    retreiveAircrafts,
    chooseAircraft,
    clearChosenAircraft,
    loading: false,
  } as unknown as UseAircraftsResult;

  const mockUseMyFlightsContext = (props: Partial<UseAircraftsResult> = {}) =>
    jest.fn(() => ({ aircraftsResult: { ...aircraftsResult, ...props } }));

  beforeEach(() => {
    (AviaInput as unknown as jest.Mock).mockImplementation(MockedAviaInput);
    (AircraftCard as unknown as jest.Mock).mockImplementation(
      MockedAircraftCard
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
    const { baseElement } = renderWithTheme(<AircraftForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when registration passes', () => {
    test('calls mockedSetValue with registration', async () => {
      // Arange
      (useInputValue as unknown as jest.Mock).mockImplementation(
        mockUseInputValue()
      );
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        mockUseMyFlightsContext()
      );
      // Act
      renderWithTheme(<AircraftForm registration="Registration" />);
      // Assert
      expect(mockedSetValue).toBeCalledWith('Registration');
    });
  });

  describe('when no chosenAircraft', () => {
    const contextProps = { chosenAircraft: null };

    test('renders successfully', () => {
      // Arange
      (useInputValue as unknown as jest.Mock).mockImplementation(
        mockUseInputValue()
      );
      (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
        mockUseMyFlightsContext(contextProps)
      );
      // Act
      const { baseElement } = renderWithTheme(<AircraftForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
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
        const { baseElement } = renderWithTheme(<AircraftForm />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('and clicks to search', () => {
        test('calls retreiveAircrafts', async () => {
          // Arange
          (useInputValue as unknown as jest.Mock).mockImplementation(
            mockUseInputValue(value)
          );
          (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
            mockUseMyFlightsContext(contextProps)
          );
          const { getByLabelText } = renderWithTheme(<AircraftForm />);
          // Act
          await userEvent.click(getByLabelText('Search'));
          // Assert
          expect(retreiveAircrafts).toBeCalledWith('Val');
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
        mockUseMyFlightsContext({ chosenAircraft: null, aircrafts: null })
      );
      // Act
      const { baseElement } = renderWithTheme(<AircraftForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
