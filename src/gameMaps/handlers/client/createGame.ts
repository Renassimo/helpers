import { GameAttributes, GameData } from '@/gameMaps/types';

const createGame = async (attributes: GameAttributes): Promise<GameData> => {
  const response = await fetch('/api/gameMaps/games', {
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

export default createGame;
