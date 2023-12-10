import { createContext, Dispatch, SetStateAction } from 'react';

import { AnswersState, DemandData, QuestionData } from '@/types/motivationPoll';

const MotivationPollContext = createContext<{
  description: string;
  isStarted: boolean;
  isFinished: boolean;
  startTest: () => void;
  currentQuestionNumber: null | number;
  currentQuestion: QuestionData | null;
  onChangeAnswer: (questionId: number, answerId: number, value: number) => void;
  answersState: AnswersState;
  questionsCount: number;
  setToNextQuestion: () => void;
  setToPrevQuestion: () => void;
  name: null | string;
  setName: Dispatch<SetStateAction<string | null>>;
  prepareResults: () => void;
  results: null | DemandData[];
}>({
  description: '',
  isStarted: false,
  isFinished: false,
  startTest: () => {},
  currentQuestionNumber: null,
  currentQuestion: null,
  onChangeAnswer: () => {},
  answersState: {},
  questionsCount: 0,
  setToNextQuestion: () => {},
  setToPrevQuestion: () => {},
  name: null,
  setName: () => {},
  prepareResults: () => {},
  results: null,
});

export default MotivationPollContext;
