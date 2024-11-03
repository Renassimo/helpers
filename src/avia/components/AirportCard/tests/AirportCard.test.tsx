import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import AviaCard from '@/avia/components/AviaCard';

import MockedAviaCard from '@/avia/components/AviaCard/mocks';

import { mockedDeserializedAirports } from '@/avia/types/avia/mocks';

import AirportCard from '../AirportCard';

jest.mock('@/avia/components/AviaCard');

describe('AirportCard', () => {
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
      <AirportCard
        data={mockedDeserializedAirports[0]}
        chosen
        onClick={jest.fn()}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when title passed', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <AirportCard
          data={mockedDeserializedAirports[0]}
          chosen
          onClick={jest.fn()}
          title="Origin"
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when partial airport passed', () => {
    test('renders successfully', () => {
      // Arange
      const mockedAirport = {
        ...mockedDeserializedAirports[0],
        attributes: {
          ...mockedDeserializedAirports[0].attributes,
          airportName: null,
        },
      };
      // Act
      const { baseElement } = renderWithTheme(
        <AirportCard data={mockedAirport} onClick={jest.fn()} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and when title passed', () => {
      test('renders successfully', () => {
        // Arange
        const mockedAirport = {
          ...mockedDeserializedAirports[0],
          attributes: {
            ...mockedDeserializedAirports[0].attributes,
            airportName: null,
          },
        };
        // Act
        const { baseElement } = renderWithTheme(
          <AirportCard
            data={mockedAirport}
            title="Origin"
            onClick={jest.fn()}
          />
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });
});
