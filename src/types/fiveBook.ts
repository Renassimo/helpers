export interface FiveBookData {
  id: string;
  attributes: {
    dayCode: number;
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
