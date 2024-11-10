import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useStateValue from '@/common/hooks/useStateValue';

import AviaInput from '@/avia/components/AviaInput';
import AircraftCard from '@/avia/components/AircraftCard';

import MockedAviaInput from '@/avia/components/AviaInput/mocks';
import MockedAircraftCard from '@/avia/components/AircraftCard/mocks';

import { mockedDeserializedAircrafts } from '@/avia/types/avia/mocks';

import BaseAircraftForm from '../BaseAircraftForm';
import { Avia } from '@/avia/types/avia';

jest.mock('@/common/hooks/useStateValue');
jest.mock('@/avia/components/AviaInput');
jest.mock('@/avia/components/AircraftCard');

describe('BaseAircraftForm', () => {
  const mockedSetValue = jest.fn();
  const mockUseStateValue = (value = '') =>
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
  } as unknown as Avia.AircraftsResult;

  const getAircraftsResult = (props: Partial<Avia.AircraftsResult> = {}) => ({
    ...aircraftsResult,
    ...props,
  });

  beforeEach(() => {
    (AviaInput as unknown as jest.Mock).mockImplementation(MockedAviaInput);
    (AircraftCard as unknown as jest.Mock).mockImplementation(
      MockedAircraftCard
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
      <BaseAircraftForm aircraftsResult={getAircraftsResult()} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when registration passes', () => {
    test('calls mockedSetValue with registration', async () => {
      // Arange
      // Act
      renderWithTheme(
        <BaseAircraftForm
          registration="Registration"
          aircraftsResult={getAircraftsResult()}
        />
      );
      // Assert
      expect(mockedSetValue).toBeCalledWith('Registration');
    });
  });

  describe('when no chosenAircraft', () => {
    const contextProps = { chosenAircraft: null };

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <BaseAircraftForm aircraftsResult={getAircraftsResult(contextProps)} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
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
          <BaseAircraftForm
            aircraftsResult={getAircraftsResult(contextProps)}
          />
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('and clicks to search', () => {
        test('calls retreiveAircrafts', async () => {
          // Arange
          (useStateValue as unknown as jest.Mock).mockImplementation(
            mockUseStateValue(value)
          );
          const { getByLabelText } = renderWithTheme(
            <BaseAircraftForm
              aircraftsResult={getAircraftsResult(contextProps)}
            />
          );
          // Act
          await userEvent.click(getByLabelText('Search'));
          // Assert
          expect(retreiveAircrafts).toBeCalledWith('Val', false);
        });

        describe('and useOwnDb is true', () => {
          test('calls retreiveAircrafts', async () => {
            // Arange
            (useStateValue as unknown as jest.Mock).mockImplementation(
              mockUseStateValue(value)
            );
            const { getByLabelText } = renderWithTheme(
              <BaseAircraftForm
                aircraftsResult={getAircraftsResult(contextProps)}
                useOwnDb
              />
            );
            // Act
            await userEvent.click(getByLabelText('Search'));
            // Assert
            expect(retreiveAircrafts).toBeCalledWith('Val', true);
          });
        });

        describe('and uwhen checks "From own database"', () => {
          test('calls retreiveAircrafts', async () => {
            // Arange
            (useStateValue as unknown as jest.Mock).mockImplementation(
              mockUseStateValue(value)
            );
            const { getByLabelText } = renderWithTheme(
              <BaseAircraftForm
                aircraftsResult={getAircraftsResult(contextProps)}
              />
            );
            await userEvent.click(getByLabelText('From own database'));
            // Act
            await userEvent.click(getByLabelText('Search'));
            // Assert
            expect(retreiveAircrafts).toBeCalledWith('Val', true);
          });
        });
      });
    });
  });

  describe('when no aircrafts', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <BaseAircraftForm
          aircraftsResult={getAircraftsResult({
            chosenAircraft: null,
            aircrafts: null,
          })}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
