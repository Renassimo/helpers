import { Data, PageProps, ServerSideProps } from '@/common/types/props';
import { PlayData } from '@/gameMaps/types/playTypes';

export interface GameAttributes {
  backgroundColor: string;
  description: string;
  mapImageUrl: string;
  title: string;
}

export type GameData = Data<GameAttributes>;

export type GamePageProps = PageProps<{
  gameData: GameData;
  playsData: PlayData[];
}>;
export type GamesPageProps = PageProps<GameData[]>;

export type GameServerSideProps = ServerSideProps<GamePageProps>;
export type GamesServerSideProps = ServerSideProps<GamesPageProps>;
