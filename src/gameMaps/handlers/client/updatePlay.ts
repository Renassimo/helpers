import { PlayAttributes, PlayData } from '@/gameMaps/types';

const updatePlay = async (
  gameId: string,
  id: string,
  attributes: Partial<PlayAttributes>
): Promise<PlayData> => {
  const response = await fetch(`/api/gameMaps/games/${gameId}/plays/${id}`, {
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

export default updatePlay;
