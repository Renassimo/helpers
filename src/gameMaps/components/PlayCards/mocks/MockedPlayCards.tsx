import { PlayData } from '@/gameMaps/types';

const MockedPlayCards = jest.fn(
  ({ data, gameId }: { data: PlayData[]; gameId: string }) => (
    <div>
      Mocked Play Cards ({gameId}):
      {data.map((item) => (
        <span key={item.id}>{item.attributes.title}</span>
      ))}
    </div>
  )
);

export default MockedPlayCards;
