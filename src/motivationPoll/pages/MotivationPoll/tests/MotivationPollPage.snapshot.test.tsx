import renderWithTheme from '@/tests/helpers';

import usePdfDownload from '@/common/hooks/usePdfDownload';

import MotivationPoll from '@/motivationPoll/components/MotivationPoll';
import MockedMotivationPoll from '@/motivationPoll/components/MotivationPoll/mocks/MockedMotivationPoll';
import LocaleLinks from '@/common/components/LocaleLinks';
import MockedLocaleLinks from '@/common/components/LocaleLinks/mocks/MockedLocaleLinks';

import { mockedApiData } from '@/types/motivationPoll/mocks';

import MotivationPollPage from '../MotivationPollPage';

jest.mock('@/hooks/common/usePdfDownload');
jest.mock('@/common/components/LocaleLinks');
jest.mock('@/motivationPoll/components/MotivationPoll');

describe('MotivationPollPage snapshot', () => {
  const mockedOnDownloadPdf = jest.fn();
  const mockedPdfRef = null;
  const mockedUsePdfDownload = jest.fn(() => ({
    pdfRef: mockedPdfRef,
    onDownloadPdf: mockedOnDownloadPdf,
  }));
  const mockedLocales = ['ru', 'en'];
  const mockedLocale = 'en';

  beforeEach(() => {
    (usePdfDownload as jest.Mock).mockImplementation(mockedUsePdfDownload);
    (MotivationPoll as jest.Mock).mockImplementation(MockedMotivationPoll);
    (LocaleLinks as jest.Mock).mockImplementation(MockedLocaleLinks);
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { container } = renderWithTheme(
      <MotivationPollPage
        data={mockedApiData}
        locale={mockedLocale}
        locales={mockedLocales}
      />
    );
    // Assert
    expect(mockedUsePdfDownload).toHaveBeenCalledWith(
      'motivation-poll-results'
    );
    expect(container).toMatchSnapshot();
  });
});
