import { PlayAttributes, PlayData } from '@/gameMaps/types';

const createPlay = async (
  gameId: string,
  attributes: PlayAttributes
): Promise<PlayData> => {
  const response = await fetch(`/api/gameMaps/games/${gameId}/plays`, {
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

export default createPlay;
