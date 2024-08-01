import { CategoryAttributes, CategoryData } from '@/gameMaps/types';

const createCategory = async (
  gameId: string,
  attributes: CategoryAttributes
): Promise<CategoryData> => {
  const response = await fetch(`/api/gameMaps/games/${gameId}/categories`, {
    method: 'POST',
    body: JSON.stringify({
      data: {
        attributes,
      },
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();

  if (!response.ok) throw responseData?.error;

  return responseData.data;
};

export default createCategory;
