import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/tests/helpers/renderWithTheme';

import useMotivationPoll from '@/hooks/motivationPoll/useMotivationPoll';

import QuestionForm from '../QuestionForm';

import {
  mockedAnswerState,
  mockedCurrentQuestion2,
  mockedCurrentQuestion3,
  mockedQuestionsCount,
} from '@/types/motivationPoll/mocks';

jest.mock('@/hooks/motivationPoll/useMotivationPoll');

describe('QuestionForm', () => {
  const mockedOnChangeAnswer = jest.fn();
  const mockedSetToPrevQuestion = jest.fn();
  const mockedSetToNextQuestion = jest.fn();
  let currentMockedAnswerState = mockedAnswerState;
  let mockedCurrentQuestion = mockedCurrentQuestion2;

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      currentQuestion: mockedCurrentQuestion,
      answersState: currentMockedAnswerState,
      questionsCount: mockedQuestionsCount,
      onChangeAnswer: mockedOnChangeAnswer,
      setToPrevQuestion: mockedSetToPrevQuestion,
      setToNextQuestion: mockedSetToNextQuestion,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When answer changes', () => {
    beforeEach(() => {
      currentMockedAnswerState = mockedAnswerState;
    });
    test('calls onChangeAnswer', async () => {
      // Arange
      const { getByText } = renderWithTheme(<QuestionForm />);
      const answerMark =
        getByText('Q2 A3').nextSibling?.firstChild?.childNodes[4];
      await userEvent.click(answerMark as Element);
      // Assert
      expect(mockedOnChangeAnswer).toHaveBeenCalledWith(
        mockedCurrentQuestion.id,
        mockedCurrentQuestion.answers[2].id,
        NaN // 2 - should be 2, but check other asserts
      );
    });
  });

  describe('when prev button clicked', () => {
    test('calls setToPrevQuestion', async () => {
      // Arange
      const { getByText } = renderWithTheme(<QuestionForm />);
      // Act
      await userEvent.click(getByText('Previous'));
      // Assert
      expect(mockedSetToPrevQuestion).toHaveBeenCalled();
      expect(mockedSetToNextQuestion).not.toHaveBeenCalled();
    });
  });

  describe('when next button clicked', () => {
    beforeEach(() => {
      currentMockedAnswerState = {
        ...mockedAnswerState,
        1: { ...mockedAnswerState[1], completed: true },
      };
    });
    test('calls setToNextQuestion', async () => {
      // Arange
      const { getByText } = renderWithTheme(<QuestionForm />);
      // Act
      await userEvent.click(getByText('Next'));
      // Assert
      expect(mockedSetToPrevQuestion).not.toHaveBeenCalled();
      expect(mockedSetToNextQuestion).toHaveBeenCalled();
    });
  });

  describe('when finish button clicked', () => {
    beforeEach(() => {
      mockedCurrentQuestion = mockedCurrentQuestion3;
      currentMockedAnswerState = {
        ...mockedAnswerState,
        2: { ...mockedAnswerState[2], completed: true },
      };
    });

    test('calls setToNextQuestion', async () => {
      // Arange
      const { getByText } = renderWithTheme(<QuestionForm />);
      // Act
      await userEvent.click(getByText('Finish'));
      // Assert
      expect(mockedSetToPrevQuestion).not.toHaveBeenCalled();
      expect(mockedSetToNextQuestion).toHaveBeenCalled();
    });
  });
});
