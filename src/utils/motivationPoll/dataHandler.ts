import {
  AnswerData,
  DemandData,
  MotivationPollApiData,
  MotivationPollLocale,
  MotivationPollLocalizations,
  QuestionData,
  QuestionLocalizationData,
} from 'src/types/motivationPoll';

import answersToDemands from '@/static/motivationPoll/answersToDemands';
import demandMedianValues from '@/static/motivationPoll/demandMedianValues';

import en from '@/static/motivationPoll/translations/en';
import ru from '@/static/motivationPoll/translations/ru';

const locales: MotivationPollLocalizations = {
  en,
  ru,
};

export const getDataForApi = (
  locale: MotivationPollLocale = 'en'
): MotivationPollApiData => {
  const { description, questions, demands } = locales[locale];

  return {
    language: locale,
    description,
    questions: questions.map(
      (question: QuestionLocalizationData, i: number): QuestionData => ({
        id: i,
        text: question.text,
        answers: question.answers.map(
          (answer: string, j: number): AnswerData => ({
            id: j,
            text: answer,
            demandId: answersToDemands[i][j],
          })
        ),
      })
    ),
    demands: demands.map(
      (demand: string, i: number): DemandData => ({
        id: i,
        text: demand,
        medianValue: demandMedianValues[i],
      })
    ),
  };
};
