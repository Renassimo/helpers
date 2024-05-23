import renderWithTheme from '@/tests/helpers';

import usePdfDownload from '@/hooks/common/usePdfDownload';
import MotivationPoll from '@/components/motivationPoll/MotivationPoll';
import MotivationPollPage from '../MotivationPollPage';
import { mockedApiData } from '@/types/motivationPoll/mocks';
import MockedMotivationPoll from '@/components/motivationPoll/MotivationPoll/mocks/MockedMotivationPoll';

jest.mock('@/hooks/common/usePdfDownload');
jest.mock('@/components/motivationPoll/MotivationPoll');

describe('MotivationPollPage snapshot', () => {
  const mockedOnDownloadPdf = jest.fn();
  const mockedPdfRef = null;
  const mockedUsePdfDownload = jest.fn(() => ({
    pdfRef: mockedPdfRef,
    onDownloadPdf: mockedOnDownloadPdf,
  }));

  beforeEach(() => {
    (usePdfDownload as jest.Mock).mockImplementation(mockedUsePdfDownload);
    (MotivationPoll as jest.Mock).mockImplementation(MockedMotivationPoll);
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { container } = renderWithTheme(
      <MotivationPollPage data={mockedApiData} />
    );
    // Assert
    expect(mockedUsePdfDownload).toHaveBeenCalledWith(
      'motivation-poll-results'
    );
    expect(container).toMatchSnapshot();
  });
});
