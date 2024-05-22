import { Dispatch, SetStateAction } from 'react';

export interface DemandData {
  id: number;
  text: string;
  medianValue: number;
  points?: number;
}

export interface AnswerData {
  id: number;
  text: string;
  demandId: number;
}

export interface QuestionData {
  id: number;
  text: string;
  answers: AnswerData[];
}

export interface QuestionLocalizationData {
  text: string;
  answers: string[];
}

export interface MotivationPollLocalizationData {
  description: string;
  demands: string[];
  questions: QuestionLocalizationData[];
}

const motivationTestLocales = ['en', 'ru'] as const;

export type MotivationPollLocale = (typeof motivationTestLocales)[number];

export const isMotivationPollLocale = (x: any): x is MotivationPollLocale =>
  motivationTestLocales.includes(x);

export type MotivationPollLocalizations = {
  [key in MotivationPollLocale]: MotivationPollLocalizationData;
};

export interface MotivationPollApiData {
  language: string;
  description: string;
  questions: QuestionData[];
  demands: DemandData[];
}

export interface AnswersState {
  [key: number]: {
    completed: boolean;
    remainingPoints: number;
    answers: {
      [key: number]: {
        id: number;
        points: number;
        demandId: number;
        text: string;
      };
    };
  };
}

export interface MotivationPollContextData {
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
}

export const MotivationPollDefaultContextData = {
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
};
