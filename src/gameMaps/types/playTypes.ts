import { Data, PageProps, ServerSideProps } from '@/common/types/props';
import { GameData } from '@/gameMaps/types/gameTypes';
import { CategoryData } from '@/gameMaps/types/categoryTypes';
import { ItemData } from '@/gameMaps/types/itemTypes';

export interface PlayAttributes {
  title: string;
  description: string;
  lastUpdateDate: string;
  startDate: string;
}

export type PlayData = Data<PlayAttributes>;

export type PlayPageProps = PageProps<{
  gameData: GameData;
  playData: PlayData;
  categoriesData: CategoryData[];
  itemsData: ItemData[];
}>;

export type PlayServerSideProps = ServerSideProps<PlayPageProps>;
