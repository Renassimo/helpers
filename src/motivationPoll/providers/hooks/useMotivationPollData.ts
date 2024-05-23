import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  AnswersState,
  DemandData,
  MotivationPollApiData,
  MotivationPollContextData,
  QuestionData,
} from 'src/types/motivationPoll';

const setInitialAnswersState = (questions: QuestionData[]): AnswersState => {
  return questions.reduce(
    (result, question) => ({
      ...result,
      [question.id]: {
        completed: false,
        remainingPoints: 11,
        answers: question.answers.reduce(
          (answersResult, answer) => ({
            ...answersResult,
            [answer.id]: {
              ...answer,
              points: 0,
            },
          }),
          {}
        ),
      },
    }),
    {}
  );
};

const useMotivationPollData = (
  apiData: MotivationPollApiData
): MotivationPollContextData => {
  const { demands, description, questions } = apiData;

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<
    null | number
  >(null);
  const [currentQuestion, setCurrentQuestion] = useState<null | QuestionData>(
    null
  );
  const [answersState, setAnswersState] = useState<AnswersState>(
    setInitialAnswersState(questions)
  );
  const [name, setName] = useState<null | string>(null);
  const [results, setResults] = useState<null | DemandData[]>(null);

  const questionsCount = useMemo(() => questions.length, [questions.length]);

  const setToNextQuestion = useCallback(() => {
    setCurrentQuestionNumber((current) => {
      const newQuestionNumber = (current ?? 0) + 1;
      if (newQuestionNumber > questionsCount - 1) {
        setIsFinished(true);
        return null;
      }
      return newQuestionNumber;
    });
  }, [questionsCount, setCurrentQuestionNumber, setIsFinished]);

  const setToPrevQuestion = useCallback(() => {
    setCurrentQuestionNumber((current) => {
      if (current === null || current === 0) return null;
      return current - 1;
    });
  }, [setCurrentQuestionNumber]);

  const onChangeAnswer = useCallback(
    (questionId: number, answerId: number, value: number) => {
      setAnswersState((current) => {
        const question = current[questionId];
        const { remainingPoints, answers } = question;
        const answerPoints = answers[answerId].points;

        const answerPointsDifference = value - answerPoints;
        const possibleRemainingPoints =
          remainingPoints - answerPointsDifference;

        const newRemainingPoints =
          possibleRemainingPoints >= 0 ? possibleRemainingPoints : 0;
        const remainingDifference = remainingPoints - newRemainingPoints;

        const newPoints = answerPoints + remainingDifference;

        return {
          ...current,
          [questionId]: {
            ...question,
            completed: newRemainingPoints === 0,
            remainingPoints: newRemainingPoints,
            answers: {
              ...question.answers,
              [answerId]: {
                ...answers[answerId],
                points: newPoints,
              },
            },
          },
        };
      });
    },
    [setAnswersState]
  );

  const prepareResults = useCallback(() => {
    const preparedResult: number[] = [];
    for (let i = 0; i < demands.length; i++) {
      preparedResult.push(0);
    }
    for (const i in answersState) {
      const question = answersState[i];
      for (const j in question.answers) {
        const answer = question.answers[j];
        const { demandId, points } = answer;
        preparedResult[demandId] = (preparedResult[demandId] ?? 0) + points;
      }
    }

    setResults(
      demands.map((demand: DemandData, i: number) => ({
        ...demand,
        points: preparedResult[i],
      }))
    );
  }, [answersState, demands]);

  useEffect(() => {
    if (typeof currentQuestionNumber === 'number')
      setCurrentQuestion(questions[currentQuestionNumber]);
    else setCurrentQuestion(null);
  }, [questions, currentQuestionNumber]);

  const startTest = useCallback(() => {
    setCurrentQuestionNumber(0);
    setIsStarted(true);
  }, []);

  return {
    description,
    isStarted,
    isFinished,
    startTest,
    currentQuestionNumber,
    currentQuestion,
    onChangeAnswer,
    answersState,
    questionsCount,
    setToNextQuestion,
    setToPrevQuestion,
    name,
    setName,
    prepareResults,
    results,
  };
};

export default useMotivationPollData;
