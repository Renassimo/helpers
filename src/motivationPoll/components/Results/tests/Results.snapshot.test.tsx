import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import ResultsTable from '@/motivationPoll/components/ResultsTable';
import ResultsChart from '@/motivationPoll/components/ResultsChart';

import MockedResultsTable from '@/motivationPoll/components/ResultsTable/mocks';
import MockedResultsChart from '@/motivationPoll/components/ResultsChart/mocks';

import Results from '../Results';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');
jest.mock('@/motivationPoll/components/ResultsTable');
jest.mock('@/motivationPoll/components/ResultsChart');

describe('Results', () => {
  const mockedName = 'Mocked Name';
  const mockedOnDownloadPdf = jest.fn();

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      name: mockedName,
    }));
    (ResultsTable as jest.Mock).mockImplementation(MockedResultsTable);
    (ResultsChart as jest.Mock).mockImplementation(MockedResultsChart);
  });

  describe('when to clickes to Save as PDF', () => {
    test('calls onDownloadPdf', async () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <Results onDownloadPdf={mockedOnDownloadPdf} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
