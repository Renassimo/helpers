import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { showTimePassed, showWhen } from '@/common/utils/dayjs';

import AviaCard from '@/avia/components/AviaCard';

import MockedAviaCard from '@/avia/components/AviaCard/mocks';

import { mockedDeserializedAircrafts } from '@/avia/types/avia/mocks';

import AircraftCard from '../AircraftCard';

jest.mock('@/common/utils/dayjs');
jest.mock('@/avia/components/AviaCard');

describe('AircraftCard', () => {
  beforeEach(() => {
    (showTimePassed as unknown as jest.Mock).mockImplementation(
      jest.fn(() => 'N years')
    );
    (showWhen as unknown as jest.Mock).mockImplementation(
      jest.fn(() => 'Then')
    );
    (AviaCard as unknown as jest.Mock).mockImplementation(MockedAviaCard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <AircraftCard
        data={mockedDeserializedAircrafts[0]}
        chosen
        onClick={jest.fn()}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when partial aircraft passed', () => {
    test('renders successfully', () => {
      // Arange
      const mockedAircraft = {
        ...mockedDeserializedAircrafts[0],
        attributes: {
          ...mockedDeserializedAircrafts[0].attributes,
          typeName: null,
          modelCode: null,
          serial: null,
        },
      };
      // Act
      const { baseElement } = renderWithTheme(
        <AircraftCard data={mockedAircraft} onClick={jest.fn()} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
