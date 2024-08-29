import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useAlerts from '@/common/hooks/alerts';

import PageTemplate from '@/common/templates/PageTemplate';
import MyFlightsProvider from '@/myFlights/providers/MyFlightsProvider';
import MyFlights from '@/myFlights/components/MyFlights';

import { mockedPageInfos, mockedUser } from '@/auth/types/mocks';
import { mockedMyFlightsList } from '@/myFlights/types/mocks';
import { mockedNotionError418 } from '@/common/types/notion/mocks';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';
import MockedMyFlightsProvider from '@/myFlights/providers/mocks';
import MockedMyFlights from '@/myFlights/components/MyFlights/mocks';

import MyFlightsPage from '../MyFlightsPage';

jest.mock('@/common/hooks/alerts');
jest.mock('@/common/templates/PageTemplate');
jest.mock('@/myFlights/providers/MyFlightsProvider');
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
    (MyFlightsProvider as unknown as jest.Mock).mockImplementationOnce(
      MockedMyFlightsProvider
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
        data={mockedMyFlightsList}
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
