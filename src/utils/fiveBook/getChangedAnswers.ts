import { ClientAnswer } from '@/types/fiveBook';

const getChangedAnswers = (
  original: ClientAnswer[] = [],
  changed: Record<string, string> = {},
  onlyCreate = true
) => {
  if (original.length === 0 || !changed) return null;
  const changedAnswers = Object.entries(changed).reduce(
    (result, [key, value]) => {
      const originalAnswer = original.find(({ year }) => year === key);

      if (!originalAnswer) return result;
      if (onlyCreate && originalAnswer?.value) return result;
      if (originalAnswer?.value === value) return result;

      return {
        ...result,
        [key]: { value },
      };
    },
    {}
  );
  return Object.keys(changedAnswers).length > 0 ? changedAnswers : null;
};

export default getChangedAnswers;
