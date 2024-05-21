import { AnswersState, DemandData, QuestionData } from '../motivationPollTypes';

export const mockedCurrentQuestion1: QuestionData = {
  id: 0,
  text: 'Question 1?',
  answers: [
    { id: 0, text: 'Q1 A1', demandId: 0 },
    { id: 1, text: 'Q1 A2', demandId: 2 },
    { id: 2, text: 'Q1 A3', demandId: 4 },
    { id: 3, text: 'Q1 A4', demandId: 6 },
  ],
};

export const mockedCurrentQuestion2: QuestionData = {
  id: 1,
  text: 'Question 2?',
  answers: [
    { id: 0, text: 'Q2 A1', demandId: 0 },
    { id: 1, text: 'Q2 A2', demandId: 1 },
    { id: 2, text: 'Q2 A3', demandId: 3 },
    { id: 3, text: 'Q2 A4', demandId: 5 },
  ],
};

export const mockedCurrentQuestion3: QuestionData = {
  id: 2,
  text: 'Question 3?',
  answers: [
    { id: 0, text: 'Q3 A1', demandId: 0 },
    { id: 1, text: 'Q3 A2', demandId: 3 },
    { id: 2, text: 'Q3 A3', demandId: 4 },
    { id: 3, text: 'Q3 A4', demandId: 6 },
  ],
};

export const mockedCurrentQuestion: QuestionData = mockedCurrentQuestion2;

export const mockedAnswerState: AnswersState = {
  0: {
    completed: true,
    remainingPoints: 0,
    answers: {
      0: {
        id: 0,
        points: 2,
        demandId: 0,
        text: 'Q1 A1',
      },
      1: {
        id: 1,
        points: 2,
        demandId: 2,
        text: 'Q1 A2',
      },
      2: {
        id: 2,
        points: 3,
        demandId: 4,
        text: 'Q1 A3',
      },
      3: {
        id: 3,
        points: 4,
        demandId: 6,
        text: 'Q1 A4',
      },
    },
  },
  1: {
    completed: false,
    remainingPoints: 6,
    answers: {
      0: {
        id: 0,
        points: 2,
        demandId: 0,
        text: 'Q2 A1',
      },
      1: {
        id: 1,
        points: 3,
        demandId: 1,
        text: 'Q2 A2',
      },
      2: {
        id: 2,
        points: 0,
        demandId: 3,
        text: 'Q2 A3',
      },
      3: {
        id: 3,
        points: 0,
        demandId: 5,
        text: 'Q2 A4',
      },
    },
  },
  2: {
    completed: false,
    remainingPoints: 0,
    answers: {
      0: {
        id: 0,
        points: 0,
        demandId: 0,
        text: 'Q3 A1',
      },
      1: {
        id: 1,
        points: 0,
        demandId: 3,
        text: 'Q3 A2',
      },
      2: {
        id: 2,
        points: 0,
        demandId: 4,
        text: 'Q3 A3',
      },
      3: {
        id: 3,
        points: 0,
        demandId: 6,
        text: 'Q3 A4',
      },
    },
  },
};

export const mockedQuestionsCount = 3;

export const mockedresults: DemandData[] = [
  {
    id: 1,
    text: 'First',
    medianValue: 2,
    points: 3,
  },
  {
    id: 2,
    text: 'Second',
    medianValue: 4,
    points: 6,
  },
  {
    id: 3,
    text: 'Third',
    medianValue: 6,
    points: 9,
  },
];
