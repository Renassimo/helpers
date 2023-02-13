export interface FiveBookData {
  id: string;
  attributes: {
    dayCode: DayCode;
    answers: FiveBookAnswer;
    question: FiveBookQuestionOrAnswer;
  };
}

export interface FiveBookAnswer {
  [key: string]: FiveBookQuestionOrAnswer;
}

export interface FiveBookQuestionOrAnswer {
  id: string;
  value: string | null;
}

export interface DayCode {
  id: string;
  value: number;
}
