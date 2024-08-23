import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useAlerts from '@/common/hooks/alerts';

import PageTemplate from '@/common/templates/PageTemplate';
import FlightsProvider from '@/myFlights/providers/FlightsProvider';
import MyFlights from '@/myFlights/components/MyFlights';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedFlightsList } from '@/myFlights/types/mocks';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks/MockedPageTemplate';
import MockedFlightsProvider from '@/myFlights/providers/mocks/MockedFlightsProvider';
import MockedMyFlights from '@/myFlights/components/MyFlights/mocks/MockedMyFlights';

import MyFlightsPage from '../MyFlightsPage';

jest.mock('@/common/hooks/alerts');
jest.mock('@/common/templates/PageTemplate');
jest.mock('@/myFlights/providers/FlightsProvider');
jest.mock('@/myFlights/components/MyFlights');

describe('MyFlightsPage', () => {
  const mockedCreateErrorAlert = jest.fn();
  const mockedUseAlerts = jest.fn(() => ({
    createErrorAlert: mockedCreateErrorAlert,
  }));

  beforeEach(() => {
    (useAlerts as unknown as jest.Mock).mockImplementation(mockedUseAlerts);
    (PageTemplate as unknown as jest.Mock).mockImplementationOnce(
      MockedPageTemplate
    );
    (FlightsProvider as unknown as jest.Mock).mockImplementationOnce(
      MockedFlightsProvider
    );
    (MyFlights as unknown as jest.Mock).mockImplementationOnce(MockedMyFlights);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { container } = renderWithTheme(
      <MyFlightsPage
        user={mockedUser}
        pages={mockedPageInfos}
        data={mockedFlightsList}
        error={null}
      />
    );
    // Assert
    expect(container).toMatchSnapshot();
    expect(mockedCreateErrorAlert).not.toHaveBeenCalled();
  });

  describe('when receives error', () => {
    test('renders successfully', () => {
      // Arange
      // Act
      const { container } = renderWithTheme(
        <MyFlightsPage
          user={mockedUser}
          pages={mockedPageInfos}
          data={null}
          error={mockedNotionError418}
        />
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(mockedCreateErrorAlert).toHaveBeenCalledWith('I am Teapot');
    });
  });
});
