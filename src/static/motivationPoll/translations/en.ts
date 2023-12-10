import {
  MotivationPollLocalizationData,
  QuestionLocalizationData,
} from 'src/types/motivationPoll';

export const description =
  'Distribute the 11 points among the answers that most accurately reflect you. Use all of 11 points on each question.';

export const demands: string[] = [
  'Desire for a high salary and material rewards.',
  'Desire for good working conditions and a comfortable environment.',
  'Desire for clear work structuring.',
  'Desire for social contacts.',
  'Desire for more free time and schedule flexibility.',
  'Desire for recognition from others.',
  'Desire to set bold and challenging goals for oneself and achieve them.',
  'Desire for influence and power.',
  'Desire for variety.',
  'Desire to be creative.',
  'Desire for self-improvement.',
  'Desire to feel valued in interesting socially beneficial work.',
];

export const questions: QuestionLocalizationData[] = [
  // 1
  {
    text: 'I believe I could make a significant contribution in a job where',
    answers: [
      'there is a good salary and other forms of compensation;',
      'there is the possibility to choose my work schedule;',
      'I could influence decision-making and demonstrate my qualities as an employee;',
      'I have the opportunity to improve and grow as a person.',
    ],
  },
  // 2
  {
    text: 'I would not want to work where',
    answers: [
      'there are unclear instructions about what is required of me;',
      'there is almost no feedback and evaluation of my performance;',
      'what I do seems little useful and valuable;',
      'working conditions are poor, too noisy, or dirty.',
    ],
  },
  // 3
  {
    text: 'It is important for me that my job',
    answers: [
      'is associated with significant variety and changes;',
      'gives me the opportunity to work with a wide range of people;',
      'provides me with clear instructions, so I know what is expected of me;',
      'allows me to fully relax.',
    ],
  },
  // 4
  {
    text: 'I believe I would not be very interested in a job that',
    answers: [
      'provides me with few contacts with other people;',
      'would hardly be noticed by others;',
      'has no clear outlines, so I am not sure what is required of me;',
      'is associated with a certain amount of routine operations.',
    ],
  },
  // 5
  {
    text: 'I like a job if',
    answers: [
      'I have a clear idea of what is expected of me;',
      'I have a comfortable workplace, and I am not easily distracted;',
      'I have good rewards and salary;',
      'it allows me to improve my professional qualities.',
    ],
  },
  // 6
  {
    text: 'I think I would like it if',
    answers: [
      'there were good working conditions and no pressure on me;',
      'I had a very good salary;',
      'the work was actually useful and satisfying;',
      'my achievements and work were recognized and appreciated.',
    ],
  },
  // 7
  {
    text: 'I do not believe that a job should',
    answers: [
      'be poorly structured, so it is unclear what needs to be done;',
      'entice people so much that they think about it after work;',
      'be insignificant and of little use to society or uninteresting to perform;',
      'remain unrecognized, or its completion should be taken for granted.',
    ],
  },
  // 8
  {
    text: 'Satisfying work',
    answers: [
      'is associated with significant variety, changes, and enthusiasm stimulation;',
      'provides the opportunity to improve professional qualities and develop as a person;',
      'is useful and meaningful to society;',
      'allows me to be creative (show a creative approach) and experiment with new ideas.',
    ],
  },
  // 9
  {
    text: 'It is important for work to',
    answers: [
      'be recognized and valued by the organization I work for;',
      'provide opportunities for personal growth and improvement;',
      'be associated with a wide variety and changes;',
      'allow the employee to influence others.',
    ],
  },
  // 10
  {
    text: 'I do not believe that work will be satisfying if',
    answers: [
      'there are few opportunities to make contacts with different people during its execution;',
      'the salary and rewards are not very good;',
      'I cannot establish and maintain good relationships with colleagues;',
      'I have very little independence or opportunities to demonstrate flexibility.',
    ],
  },
  // 11
  {
    text: 'The best job is one that',
    answers: [
      'provides good working conditions;',
      'gives clear instructions and explanations about the content of the work;',
      'involves performing interesting and useful tasks;',
      'allows for recognition of personal achievements and job quality.',
    ],
  },
  // 12
  {
    text: "I probably won't work well if",
    answers: [
      'there are few opportunities to set and achieve goals;',
      "I don't have the opportunity to improve my personal qualities;",
      'hard work goes unnoticed and is not adequately rewarded;',
      'the workplace is dusty, dirty, or noisy.',
    ],
  },
  // 13
  {
    text: 'When defining job responsibilities, it is important to',
    answers: [
      'receive guarantees that there will be no overtime;',
      'provide employees with the opportunity to set and achieve goals;',
      'create conditions for employees to show their creative side;',
      'ensure comfort and cleanliness in the workplace.',
    ],
  },
  // 14
  {
    text: "I probably won't want to work where",
    answers: [
      'I have little independence and opportunities for personal growth;',
      'research and the expression of scientific curiosity are not encouraged;',
      'there are very few contacts with a wide range of people;',
      'there are no decent bonuses and additional benefits.',
    ],
  },
  // 15
  {
    text: 'I would be satisfied if',
    answers: [
      'there is an opportunity to influence decision-making by other employees;',
      'the job provides a wide variety and changes;',
      'my achievements are recognized by others;',
      'I know exactly what is expected of me and how I should do it.',
    ],
  },
  // 16
  {
    text: 'The job would be less satisfying for me if',
    answers: [
      'it does not allow setting and achieving challenging goals;',
      'I am not clear about the rules and procedures of the job;',
      'the level of pay does not correspond to the complexity of the work;',
      'I have little influence on decisions made by others and what others do.',
    ],
  },
  // 17
  {
    text: 'I believe that a position should provide',
    answers: [
      'clear job instructions and guidance on what is expected of me;',
      'the opportunity to allocate time for task execution and rest;',
      'the opportunity to perform complex production tasks that require maximum effort;',
      'variety, changes, and rewards.',
    ],
  },
  // 18
  {
    text: 'The job would bring less satisfaction if',
    answers: [
      'it does not allow the possibility of at least a small creative contribution;',
      'it is carried out in isolation, i.e., the employee has to work alone;',
      'there is no favorable internal climate for professional growth;',
      'it does not allow influencing decision-making.',
    ],
  },
  // 19
  {
    text: 'I would like to work where',
    answers: [
      'others recognize and value the work I do;',
      'I have the opportunity to influence what others do;',
      'there is a worthy system of bonuses and additional benefits;',
      'you can propose and test new ideas and show creativity.',
    ],
  },
  // 20
  {
    text: 'I would probably not want to work where',
    answers: [
      'there is no diversity or change in the job;',
      'I have little opportunity to influence decisions;',
      'the salary is not very high;',
      'working conditions are not good enough.',
    ],
  },
  // 21
  {
    text: 'I believe that satisfying work should involve',
    answers: [
      'clear instructions so that employees know what is expected of them;',
      'the opportunity to show creativity;',
      'the opportunity to meet interesting people;',
      'a sense of satisfaction and genuinely interesting tasks.',
    ],
  },
  // 22
  {
    text: 'Work will not be enjoyable if',
    answers: [
      'there are minimal bonuses and additional benefits;',
      'working conditions are uncomfortable or very noisy;',
      'the employee does not have the opportunity to compare their work with the work of others;',
      'research, creative approach, and new ideas are not encouraged.',
    ],
  },
  // 23
  {
    text: 'I consider it important that my job provides me with',
    answers: [
      'many contacts with a wide range of interesting people;',
      'the opportunity to set and achieve goals;',
      'the opportunity to influence decision-making;',
      'a high level of salary.',
    ],
  },
  // 24
  {
    text: "I don't think I would like a job if",
    answers: [
      'working conditions are uncomfortable, the workplace is dirty or noisy;',
      'there are few chances to influence other people;',
      'there are few opportunities to achieve set goals;',
      'I cannot be creative and propose new ideas.',
    ],
  },
  // 25
  {
    text: 'In the process of organizing work, it is important to',
    answers: [
      'ensure cleanliness and comfort in the workplace;',
      'create conditions for employees to show independence;',
      'provide opportunities for variety and change;',
      'provide people with ample opportunities to interact with others.',
    ],
  },
  // 26
  {
    text: 'I probably would not want to work where',
    answers: [
      'working conditions are uncomfortable, i.e., noisy or dirty, etc.;',
      'there are few opportunities to make contacts with other people;',
      'the work is not interesting or useful;',
      'the work is routine, and tasks rarely change.',
    ],
  },
  // 27
  {
    text: 'Work is likely to be satisfying when',
    answers: [
      'people recognize and appreciate well-done work;',
      'there are ample opportunities for maneuvering and demonstrating flexibility;',
      'you can set complex and bold goals;',
      'there is time and energy left for family, sports, and hobbies.',
    ],
  },
  // 28
  {
    text: 'I would not like a job that',
    answers: [
      'is not useful and does not bring a sense of satisfaction;',
      'lacks a stimulus for change;',
      'has a strictly regulated access mode;',
      'is vague and does not involve challenging tasks.',
    ],
  },
  // 29
  {
    text: 'I would show a willingness to work where',
    answers: [
      'the work is interesting and useful;',
      'additional leave is given for a worthy contribution;',
      'I am surrounded by interesting people;',
      'I could influence decision-making.',
    ],
  },
  // 30
  {
    text: 'I do not believe that work should',
    answers: [
      'involve a person working alone most of the time;',
      'give few chances for the recognition of personal achievements of the employee;',
      'interfere with my personal life;',
      'consist mainly of routine duties.',
    ],
  },
  // 31
  {
    text: 'Well-planned work must',
    answers: [
      'provide an adequate set of benefits and many bonuses;',
      'have clear recommendations for execution and job responsibilities;',
      'provide the opportunity to set and achieve goals;',
      'stimulate and encourage the introduction of new ideas.',
    ],
  },
  // 32
  {
    text: 'I would consider that work does not bring satisfaction if',
    answers: [
      'I could not perform complex and perspective work;',
      'there were few opportunities for creativity;',
      'only a small degree of independence was allowed;',
      'the essence of the work did not seem useful or necessary.',
    ],
  },
  // 33
  {
    text: 'The most important characteristics of a position are',
    answers: [
      'the opportunity for a creative approach and original non-standard thinking;',
      'important responsibilities that bring satisfaction when completed;',
      'flexible working hours;',
      'the presence of significant goals that the employee is supposed to achieve.',
    ],
  },
];

const data: MotivationPollLocalizationData = {
  description,
  demands,
  questions,
};

export default data;
