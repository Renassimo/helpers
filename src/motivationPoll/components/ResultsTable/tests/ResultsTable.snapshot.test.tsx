import renderWithTheme from '@/tests/helpers/renderWithTheme';

import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import ResultsTable from '../ResultsTable';
import { mockedresults } from '@/motivationPoll/types/mocks';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');

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
