import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import AviaCard from '@/avia/components/AviaCard';

import MockedAviaCard from '@/avia/components/AviaCard/mocks';

import { mockedDeserializedFlights } from '@/avia/types/avia/mocks';

import FlightCard from '../FlightCard';

jest.mock('@/avia/components/AviaCard');

describe('FlightCard', () => {
  beforeEach(() => {
    (AviaCard as unknown as jest.Mock).mockImplementation(MockedAviaCard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <FlightCard
        data={mockedDeserializedFlights[0]}
        chosen
        onClick={jest.fn()}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when partial flight passed', () => {
    test('renders successfully', () => {
      // Arange
      const mockedFlight = {
        ...mockedDeserializedFlights[0],
        attributes: {
          ...mockedDeserializedFlights[0].attributes,
          origin: '',
          destinationName: '',
          distance: null,
        },
      };
      // Act
      const { baseElement } = renderWithTheme(
        <FlightCard data={mockedFlight} onClick={jest.fn()} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
