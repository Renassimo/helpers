import renderWithTheme from '@/tests/helpers';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Description from '@/components/motivationPoll/Description';
import StarterForm from '@/components/motivationPoll/StarterForm';
import QuestionForm from '@/components/motivationPoll/QuestionForm';
import FinishForm from '@/components/motivationPoll/FinishForm';

import MockedDescription from '@/components/motivationPoll/Description/mocks';
import MockedStarterForm from '@/components/motivationPoll/StarterForm/mocks';
import MockedQuestionForm from '@/components/motivationPoll/QuestionForm/mocks';
import MockedFinishForm from '@/components/motivationPoll/FinishForm/mocks';
import PollForm from '../PollForm';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');
jest.mock('@/components/motivationPoll/StarterForm');
jest.mock('@/components/motivationPoll/Description');
jest.mock('@/components/motivationPoll/QuestionForm');
jest.mock('@/components/motivationPoll/FinishForm');

describe('PollForm snapshot', () => {
  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      isFinished: true,
      isStarted: true,
    }));
    (Description as jest.Mock).mockImplementation(MockedDescription);
    (StarterForm as jest.Mock).mockImplementation(MockedStarterForm);
    (QuestionForm as jest.Mock).mockImplementation(MockedQuestionForm);
    (FinishForm as jest.Mock).mockImplementation(MockedFinishForm);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders FinishFrom', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PollForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });
  describe('when poll is not finished', () => {
    beforeEach(() => {
      (useMotivationPoll as jest.Mock).mockImplementation(() => ({
        isFinished: false,
        isStarted: true,
      }));
    });

    test('renders with description', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<PollForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
    describe('and when pol is not started', () => {
      beforeEach(() => {
        (useMotivationPoll as jest.Mock).mockImplementation(() => ({
          isFinished: false,
          isStarted: false,
        }));
      });
      test('renders with StarterForm', () => {
        // Arange
        // Act
        const { baseElement } = renderWithTheme(<PollForm />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
      describe('and when has current question', () => {
        beforeEach(() => {
          (useMotivationPoll as jest.Mock).mockImplementation(() => ({
            isFinished: false,
            isStarted: false,
            currentQuestion: 'Current question?',
          }));
        });
        test('renders with QuestionForm', () => {
          // Arange
          // Act
          const { baseElement } = renderWithTheme(<PollForm />);
          // Assert
          expect(baseElement).toMatchSnapshot();
        });
      });
    });
  });
  describe('when pol is not started', () => {
    beforeEach(() => {
      (useMotivationPoll as jest.Mock).mockImplementation(() => ({
        isFinished: true,
        isStarted: false,
      }));
    });
    test('renders with StarterForm', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<PollForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
    describe('and when has current question', () => {
      beforeEach(() => {
        (useMotivationPoll as jest.Mock).mockImplementation(() => ({
          isFinished: true,
          isStarted: false,
          currentQuestion: 'Current question?',
        }));
      });
      test('renders with QuestionForm', () => {
        // Arange
        // Act
        const { baseElement } = renderWithTheme(<PollForm />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });
});
