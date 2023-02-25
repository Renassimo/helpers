export interface FiveBookData {
  id: string;
  attributes: {
    dayCode: DayCode;
    answers: FiveBookAnswers;
    question: FiveBookQuestionOrAnswer;
  };
}

export interface FiveBookAnswers {
  [key: string]: FiveBookQuestionOrAnswer;
}

export interface FiveBookQuestionOrAnswer {
  id: string;
  value: string | null;
}

export interface DayCode {
  id: string;
  value: string;
}

export interface ClientAnswer {
  year: string;
  value: string | null;
}
