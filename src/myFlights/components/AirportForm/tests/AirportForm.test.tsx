import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import BaseAirportForm from '@/avia/components/BaseAirportForm';

import MockedBaseAirportForm from '@/avia/components/BaseAirportForm/mocks';

import AirportForm from '../AirportForm';

jest.mock('@/avia/components/BaseAirportForm');
jest.mock('@/myFlights/contexts/hooks/useMyFlightsContext');

describe('AirportForm', () => {
  beforeEach(() => {
    (useMyFlightsContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        originsResult: 'originsResult',
        destinationsResult: 'destinationsResult',
      }))
    );
    (BaseAirportForm as unknown as jest.Mock).mockImplementation(
      MockedBaseAirportForm
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<AirportForm title="Origin" />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(BaseAirportForm).toBeCalledWith(
      { airportsResult: 'originsResult', title: 'Origin' },
      {}
    );
  });

  describe('when titile is Destination', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <AirportForm title="Destination" />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(BaseAirportForm).toBeCalledWith(
        { airportsResult: 'destinationsResult', title: 'Destination' },
        {}
      );
    });
  });
});
