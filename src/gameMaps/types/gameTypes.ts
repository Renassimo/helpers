import { Data, PageProps, ServerSideProps } from '@/common/types/props';
import { PlayData } from '@/gameMaps/types/playTypes';

export interface GameAttributes {
  backgroundColor: string;
  description: string;
  title: string;
  mapImageUrl?: string;
  mapImageId?: string;
}

export type GameData = Data<GameAttributes>;

export interface GamePageData {
  gameData: GameData;
  playsData: PlayData[];
}

export type GamePageProps = PageProps<GamePageData>;
export type GamesPageProps = PageProps<GameData[]>;

export type GameServerSideProps = ServerSideProps<GamePageProps>;
export type GamesServerSideProps = ServerSideProps<GamesPageProps>;
