import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/tests/helpers/renderWithTheme';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import ResultsTable from '@/components/motivationPoll/ResultsTable';
import ResultsChart from '@/components/motivationPoll/ResultsChart';

import MockedResultsTable from '@/components/motivationPoll/ResultsTable/mocks/MockedResultsTable';
import MockedResultsChart from '@/components/motivationPoll/ResultsChart/mocks/MockedResultsChart';

import Results from '../Results';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');
jest.mock('@/components/motivationPoll/ResultsTable');
jest.mock('@/components/motivationPoll/ResultsChart');

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
      const { getByText } = renderWithTheme(
        <Results onDownloadPdf={mockedOnDownloadPdf} />
      );
      // Act
      await userEvent.click(getByText('Save as PDF'));
      // Assert
      expect(mockedOnDownloadPdf).toHaveBeenCalled();
    });
  });
});
