import Box from '@mui/material/Box';

import PlayCard from '@/gameMaps/components/PlayCard';

import { PlayData } from '@/gameMaps/types';

const PlayCards = ({
  data,
  gameId = '',
}: {
  data: PlayData[];
  gameId?: string;
}) => {
  return (
    <Box
      display="grid"
      width="100%"
      gap={2}
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {data.map((play) => (
        <PlayCard
          key={play.id}
          {...play.attributes}
          href={`${gameId}/plays/${play.id}`}
        />
      ))}
      <PlayCard
        title="+"
        description="Create new play"
        href={`${gameId}/plays/new`}
        onClick={() => console.log('New')}
      />
    </Box>
  );
};

export default PlayCards;
