import renderWithTheme from '@/tests/helpers/renderWithTheme';

import QuestionForm from '../QuestionForm';

import useMotivationPoll from '@/motivationPoll/hooks/useMotivationPoll';

import {
  mockedAnswerState,
  mockedCurrentQuestion1,
  mockedCurrentQuestion2,
  mockedCurrentQuestion3,
  mockedQuestionsCount,
} from '@/types/motivationPoll/mocks';

jest.mock('@/motivationPoll/hooks/useMotivationPoll');

describe('QuestionForm Snapshot', () => {
  const mockedOnChangeAnswer = jest.fn();
  const mockedSetToPrevQuestion = jest.fn();
  const mockedSetToNextQuestion = jest.fn();
  let mockedCurrentQuestion = mockedCurrentQuestion1;

  beforeEach(() => {
    (useMotivationPoll as jest.Mock).mockImplementation(() => ({
      currentQuestion: mockedCurrentQuestion,
      answersState: {
        ...mockedAnswerState,
        0: { ...mockedAnswerState[0], completed: false },
      },
      questionsCount: mockedQuestionsCount,
      onChangeAnswer: mockedOnChangeAnswer,
      setToPrevQuestion: mockedSetToPrevQuestion,
      setToNextQuestion: mockedSetToNextQuestion,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when on the first question', () => {
    test('matches snapshot', async () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<QuestionForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when on the following question', () => {
    beforeEach(() => {
      mockedCurrentQuestion = mockedCurrentQuestion2;
    });

    test('matches snapshot', async () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<QuestionForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when fon the last question', () => {
    beforeEach(() => {
      mockedCurrentQuestion = mockedCurrentQuestion3;
    });

    test('matches snapshot', async () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<QuestionForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
