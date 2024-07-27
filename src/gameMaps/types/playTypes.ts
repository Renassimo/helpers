import { Data, PageProps, ServerSideProps } from '@/common/types/props';
import { GameData } from '@/gameMaps/types/gameTypes';
import { CategoriesState, CategoryData } from '@/gameMaps/types/categoryTypes';
import { ItemData } from '@/gameMaps/types/itemTypes';

export interface PlayAttributes {
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export type PlayData = Data<PlayAttributes>;

export interface PlayPageData {
  gameData: GameData;
  playData: PlayData;
  categoriesData: CategoryData[];
  itemsData: ItemData[];
}

export type PlayPageProps = PageProps<PlayPageData>;

export type PlayServerSideProps = ServerSideProps<PlayPageProps>;

export interface PlayContextData {
  game: GameData | null;
  play: PlayData | null;
  updateSubmittedPlay: (newData: PlayData | null) => void;
  isPlayEditOpen: boolean;
  setIsPlayEditOpen: (newState: boolean) => void;
  categories: CategoriesState;
  categoriesList: CategoryData[];
  isEveryCategoryChosen: boolean;
  isNoCategoriesChosen: boolean;
  items: ItemData[];
  visibleItems: ItemData[];
  choseAllCategories: () => void;
  clearAllChosenCategories: () => void;
  changeCategoryChoose: (categoryId: string, chosen: boolean) => void;
  pointingCategoryId: string | null;
  setPointingCategoryId: (id: string | null) => void;
  quitFromCreatingNewItem: () => void;
}
