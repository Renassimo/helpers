import { renderHook, act, cleanup } from '@testing-library/react';
import {
  mockedApiData,
  mockedDefaultAnswerState,
} from '@/types/motivationPoll/mocks';
import useMotivationPollData from '../hooks/useMotivationPollData';
import { MotivationPollContextData } from '@/types/motivationPoll';

describe('useMotivationPollData', () => {
  const expectedFunctions = {
    startTest: expect.any(Function),
    onChangeAnswer: expect.any(Function),
    setToNextQuestion: expect.any(Function),
    setToPrevQuestion: expect.any(Function),
    setName: expect.any(Function),
    prepareResults: expect.any(Function),
  };
  const defaultExpectations: MotivationPollContextData = {
    ...expectedFunctions,
    description: 'Description',
    isStarted: false,
    isFinished: false,
    currentQuestion: null,
    currentQuestionNumber: null,
    answersState: mockedDefaultAnswerState,
    questionsCount: 3,
    name: null,
    results: null,
  };

  afterEach(() => {
    cleanup();
  });

  test('returns data', () => {
    // Arange
    const expectedResult: MotivationPollContextData = defaultExpectations;
    // Act
    const { result } = renderHook(() => useMotivationPollData(mockedApiData));
    // Assert
    expect(result.current).toEqual(expectedResult);
  });

  describe('when test is starting', () => {
    test('returns updated data', async () => {
      // Arange
      const expectedResult: MotivationPollContextData = {
        ...defaultExpectations,
        isStarted: true,
        currentQuestion: mockedApiData.questions[0],
        currentQuestionNumber: 0,
      };
      const { result } = renderHook(() => useMotivationPollData(mockedApiData));
      // Act
      await act(() => {
        result.current.startTest();
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when answer is changed', () => {
    test('returns updated data', async () => {
      // Arange
      const expectedResult: MotivationPollContextData = {
        ...defaultExpectations,
        isStarted: true,
        currentQuestion: mockedApiData.questions[0],
        currentQuestionNumber: 0,
        answersState: {
          ...mockedDefaultAnswerState,
          0: {
            ...mockedDefaultAnswerState[0],
            remainingPoints: 6,
            answers: {
              ...mockedDefaultAnswerState[0].answers,
              0: { ...mockedDefaultAnswerState[0].answers[0], points: 5 },
            },
          },
        },
      };
      const { result } = renderHook(() => useMotivationPollData(mockedApiData));
      // Act
      await act(() => {
        result.current.startTest();
        result.current.onChangeAnswer(0, 0, 5);
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });

    describe('when changed answer points is more than applicable', () => {
      test('returns updated data with maximum applicable points', async () => {
        // Arange
        const expectedResult: MotivationPollContextData = {
          ...defaultExpectations,
          isStarted: true,
          currentQuestion: mockedApiData.questions[0],
          currentQuestionNumber: 0,
          answersState: {
            ...mockedDefaultAnswerState,
            0: {
              ...mockedDefaultAnswerState[0],
              remainingPoints: 0,
              completed: true,
              answers: {
                ...mockedDefaultAnswerState[0].answers,
                0: { ...mockedDefaultAnswerState[0].answers[0], points: 5 },
                1: { ...mockedDefaultAnswerState[0].answers[1], points: 6 },
              },
            },
          },
        };
        const { result } = renderHook(() =>
          useMotivationPollData(mockedApiData)
        );
        // Act
        await act(() => {
          result.current.startTest();
          result.current.onChangeAnswer(0, 0, 5);
          result.current.onChangeAnswer(0, 1, 8);
        });
        // Assert
        expect(result.current).toEqual(expectedResult);
      });
    });
  });

  describe('when set to next question', () => {
    test('returns updated data', async () => {
      // Arange
      const expectedResult: MotivationPollContextData = {
        ...defaultExpectations,
        isStarted: true,
        currentQuestion: mockedApiData.questions[1],
        currentQuestionNumber: 1,
      };
      const { result } = renderHook(() => useMotivationPollData(mockedApiData));
      // Act
      await act(() => {
        result.current.startTest();
        result.current.setToNextQuestion();
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });

    describe('when there is no next question', () => {
      test('returns updated data and finishes', async () => {
        // Arange
        const expectedResult: MotivationPollContextData = {
          ...defaultExpectations,
          isStarted: true,
          isFinished: true,
        };
        const { result } = renderHook(() =>
          useMotivationPollData(mockedApiData)
        );
        // Act
        await act(() => {
          result.current.startTest();
          result.current.setToNextQuestion();
          result.current.setToNextQuestion();
          result.current.setToNextQuestion();
        });
        // Assert
        expect(result.current).toEqual(expectedResult);
      });
    });
  });

  describe('when set to prev question', () => {
    test('returns updated data', async () => {
      // Arange
      const expectedResult: MotivationPollContextData = {
        ...defaultExpectations,
        isStarted: true,
        currentQuestion: mockedApiData.questions[1],
        currentQuestionNumber: 1,
      };
      const { result } = renderHook(() => useMotivationPollData(mockedApiData));
      // Act
      await act(() => {
        result.current.startTest();
        result.current.setToNextQuestion();
        result.current.setToNextQuestion();
        result.current.setToPrevQuestion();
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });

    describe('when there is no prev question', () => {
      test('returns updated data', async () => {
        // Arange
        const expectedResult: MotivationPollContextData = {
          ...defaultExpectations,
          isStarted: true,
        };
        const { result } = renderHook(() =>
          useMotivationPollData(mockedApiData)
        );
        // Act
        await act(() => {
          result.current.startTest();
          result.current.setToPrevQuestion();
        });
        // Assert
        expect(result.current).toEqual(expectedResult);
      });
    });
  });

  describe('when name set', () => {
    test('returns updated data', async () => {
      // Arange
      const expectedResult: MotivationPollContextData = {
        ...defaultExpectations,
        name: 'Name',
      };
      const { result } = renderHook(() => useMotivationPollData(mockedApiData));
      // Act
      await act(() => {
        result.current.setName('Name');
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });

  describe('when prepareResults called', () => {
    test('returns updated data', async () => {
      // Arange
      const expectedResult: MotivationPollContextData = {
        ...defaultExpectations,
        isStarted: true,
        currentQuestion: mockedApiData.questions[1],
        currentQuestionNumber: 1,
        answersState: {
          ...mockedDefaultAnswerState,
          0: {
            ...mockedDefaultAnswerState[0],
            remainingPoints: 7,
            // completed: true,
            answers: {
              ...mockedDefaultAnswerState[0].answers,
              1: { ...mockedDefaultAnswerState[0].answers[1], points: 4 },
            },
          },
        },
        results: [
          {
            id: 0,
            text: 'Demand 1',
            medianValue: 5,
            points: 0,
          },
          {
            id: 1,
            text: 'Demand 2',
            medianValue: 10,
            points: 4,
          },
          {
            id: 2,
            text: 'Demand 3',
            medianValue: 20,
            points: 0,
          },
          {
            id: 3,
            text: 'Demand 4',
            medianValue: 40,
            points: 0,
          },
        ],
      };
      const { result } = renderHook(() => useMotivationPollData(mockedApiData));
      await act(() => {
        result.current.startTest();
        result.current.onChangeAnswer(0, 1, 4);
        result.current.setToNextQuestion();
      });
      // Act
      await act(() => {
        result.current.prepareResults();
      });
      // Assert
      expect(result.current).toEqual(expectedResult);
    });
  });
});
