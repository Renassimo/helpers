import renderWithTheme from '@/common/tests/helpers';

import { Avia } from '@/avia/types/avia';

import useFlownData from '@/spotting/hooks/useFlownData';

import { showReadableDate } from '@/common/utils/dayjs';

import AviaCard from '@/avia/components/AviaCard';

import MockedAviaCard from '@/avia/components/AviaCard/mocks';
import { mockedMyFlight } from '@/myFlights/types/mocks';

import FlownResult from '../FlownResult';

jest.mock('@/spotting/hooks/useFlownData');
jest.mock('@/avia/components/AviaCard');
jest.mock('@/common/utils/dayjs');

describe('FlownResult', () => {
  const aircraftsResult = 'aircraftsResult' as unknown as Avia.AircraftsResult;
  const onClick = jest.fn();

  beforeEach(() => {
    (showReadableDate as unknown as jest.Mock).mockImplementation(
      jest.fn(() => 'readableDate')
    );
    (AviaCard as unknown as jest.Mock).mockImplementation(MockedAviaCard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    // Arange
    (useFlownData as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ loading: false, data: { data: [mockedMyFlight] } }))
    );
    // Act
    const { baseElement } = renderWithTheme(
      <FlownResult onClick={onClick} aircraftsResult={aircraftsResult} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when data is loading', () => {
    test('renders correctly', () => {
      // Arange
      (useFlownData as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ loading: true, data: null }))
      );
      // Act
      const { baseElement } = renderWithTheme(
        <FlownResult onClick={onClick} aircraftsResult={aircraftsResult} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when no data loaded', () => {
    test('renders correctly', () => {
      // Arange
      (useFlownData as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ loading: false, data: { data: [] } }))
      );
      // Act
      const { baseElement } = renderWithTheme(
        <FlownResult onClick={onClick} aircraftsResult={aircraftsResult} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
