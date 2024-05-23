import renderWithTheme from '@/tests/helpers';

import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import PollForm from '@/motivationPoll/components/PollForm';
import Results from '@/motivationPoll/components/Results';

import MockedPollForm from '@/motivationPoll/components/PollForm/mocks';
import MockedResults from '@/motivationPoll/components/Results/mocks';

import MotivationPoll from '../MotivationPoll';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');
jest.mock('@/motivationPoll/components/PollForm');
jest.mock('@/motivationPoll/components/Results');

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
