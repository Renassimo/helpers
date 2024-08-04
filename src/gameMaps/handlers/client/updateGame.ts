import { GameAttributes, GameData } from '@/gameMaps/types';

const updateGame = async (
  id: string,
  attributes: Partial<GameAttributes>
): Promise<GameData> => {
  const response = await fetch(`/api/gameMaps/games/${id}`, {
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

export default updateGame;
