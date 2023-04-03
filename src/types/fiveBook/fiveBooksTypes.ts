export interface FiveBookData {
  id: string;
  attributes: {
    dayCode: string;
    answers: FiveBookAnswers;
    question: string;
    emoji?: string;
  };
}

export interface FiveBookAnswers {
  [key: string]: string;
}

export interface ClientAnswer {
  year: string;
  value: string | null;
}
