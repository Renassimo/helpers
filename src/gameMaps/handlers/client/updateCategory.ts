import { CategoryAttributes, CategoryData } from '@/gameMaps/types';

const updateCategory = async (
  gameId: string,
  id: string,
  attributes: Partial<CategoryAttributes>
): Promise<CategoryData> => {
  const response = await fetch(
    `/api/gameMaps/games/${gameId}/categories/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        data: {
          id,
          attributes,
        },
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const responseData = await response.json();

  if (!response.ok) throw responseData?.error;

  return responseData.data;
};

export default updateCategory;
