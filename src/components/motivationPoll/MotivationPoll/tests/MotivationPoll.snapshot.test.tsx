import renderWithTheme from '@/tests/helpers';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import PollForm from '@/components/motivationPoll/PollForm';
import Results from '@/components/motivationPoll/Results';

import MockedPollForm from '@/components/motivationPoll/PollForm/mocks';
import MockedResults from '@/components/motivationPoll/Results/mocks';

import MotivationPoll from '../MotivationPoll';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');
jest.mock('@/components/motivationPoll/PollForm');
jest.mock('@/components/motivationPoll/Results');

describe('MotivationPoll snapshot', () => {
  const mockedOnDownloadPdf = jest.fn();

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      results: null,
    }));
    (PollForm as jest.Mock).mockImplementation(MockedPollForm);
    (Results as jest.Mock).mockImplementation(MockedResults);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders PollForm', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <MotivationPoll onDownloadPdf={mockedOnDownloadPdf} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
  describe('when has results', () => {
    beforeEach(() => {
      (useMotivationPoll as jest.Mock).mockImplementation(() => ({
        results: [],
      }));
    });
    test('renders Results', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <MotivationPoll onDownloadPdf={mockedOnDownloadPdf} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
