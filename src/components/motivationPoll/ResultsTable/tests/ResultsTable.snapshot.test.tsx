import renderWithTheme from '@/tests/helpers/renderWithTheme';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import ResultsTable from '../ResultsTable';
import { mockedresults } from '@/types/motivationPoll/mocks';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');

describe('ResultsTable snapshots', () => {
  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      results: mockedresults,
    }));
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<ResultsTable />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when there are no results', () => {
    beforeEach(() => {
      (useMotivationPoll as jest.Mock).mockImplementation(() => ({
        results: null,
      }));
    });

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<ResultsTable />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
