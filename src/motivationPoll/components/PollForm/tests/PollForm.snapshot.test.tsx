import renderWithTheme from '@/tests/helpers';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import Description from '@/motivationPoll/components/Description';
import StarterForm from '@/motivationPoll/components/StarterForm';
import QuestionForm from '@/motivationPoll/components/QuestionForm';
import FinishForm from '@/motivationPoll/components/FinishForm';

import MockedDescription from '@/motivationPoll/components/Description/mocks';
import MockedStarterForm from '@/motivationPoll/components/StarterForm/mocks';
import MockedQuestionForm from '@/motivationPoll/components/QuestionForm/mocks';
import MockedFinishForm from '@/motivationPoll/components/FinishForm/mocks';
import PollForm from '../PollForm';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');
jest.mock('@/motivationPoll/components/StarterForm');
jest.mock('@/motivationPoll/components/Description');
jest.mock('@/motivationPoll/components/QuestionForm');
jest.mock('@/motivationPoll/components/FinishForm');

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
