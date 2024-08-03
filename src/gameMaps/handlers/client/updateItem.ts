import { ItemAttributes, ItemData } from '@/gameMaps/types';

const updateItem = async (
  gameId: string,
  id: string,
  attributes: Partial<ItemAttributes>
): Promise<ItemData> => {
  const response = await fetch(`/api/gameMaps/games/${gameId}/items/${id}`, {
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
  });
  const responseData = await response.json();

  if (!response.ok) throw responseData?.error;

  return responseData.data;
};

export default updateItem;
