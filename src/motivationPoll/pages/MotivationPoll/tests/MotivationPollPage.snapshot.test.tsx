import renderWithTheme from '@/common/tests/helpers';

import usePdfDownload from '@/common/hooks/usePdfDownload';

import MotivationPoll from '@/motivationPoll/components/MotivationPoll';
import LocaleLinks from '@/common/components/LocaleLinks';
import PageTemplate from '@/common/templates/PageTemplate/PageTemplate';

import MotivationPollPage from '../MotivationPollPage';

import MockedPageTemplate from '@/common/templates/PageTemplate/mocks';
import MockedLocaleLinks from '@/common/components/LocaleLinks/mocks';
import MockedMotivationPoll from '@/motivationPoll/components/MotivationPoll/mocks';
import { mockedApiData } from '@/motivationPoll/types/mocks';

jest.mock('@/common/hooks/usePdfDownload');
jest.mock('@/common/components/LocaleLinks');
jest.mock('@/motivationPoll/components/MotivationPoll');
jest.mock('@/common/templates/PageTemplate/PageTemplate');

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
    (PageTemplate as jest.Mock).mockImplementation(MockedPageTemplate);
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
