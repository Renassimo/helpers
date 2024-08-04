import { ItemAttributes, ItemData } from '@/gameMaps/types';

const createItem = async (
  gameId: string,
  attributes: ItemAttributes
): Promise<ItemData> => {
  const response = await fetch(`/api/gameMaps/games/${gameId}/items`, {
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

export default createItem;
