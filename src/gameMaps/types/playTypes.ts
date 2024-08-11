import { Data, PageProps, ServerSideProps } from '@/common/types/props';
import { GameData } from '@/gameMaps/types/gameTypes';
import { CategoriesState, CategoryData } from '@/gameMaps/types/categoryTypes';
import { ItemData, ItemsState } from '@/gameMaps/types/itemTypes';

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
  // Play data
  play: PlayData | null;
  updateSubmittedPlay: (newData: PlayData | null) => void;
  isPlayEditOpen: boolean;
  setIsPlayEditOpen: (newState: boolean) => void;
  // Items data
  items: ItemsState;
  itemsList: ItemData[];
  // Categories data
  categories: CategoriesState;
  categoriesList: CategoryData[];
  visibleItems: ItemData[];
  choseAllCategories: () => void;
  clearAllChosenCategories: () => void;
  changeCategoryChoose: (categoryId: string, chosen: boolean) => void;
  isEveryCategoryChosen: boolean;
  isNoCategoriesChosen: boolean;
  // Category creating and editing
  isCategoryEditOpen: boolean;
  setIsCategoryEditOpen: (newState: boolean) => void;
  editingCategory: CategoryData | null;
  openCategoryCreating: () => void;
  openCategoryUpdating: (id: string) => void;
  updateSubmittedCategory: (newData: CategoryData | null, id?: string) => void;
  // Item creating and updating
  isItemEditOpen: boolean;
  creatingItemCoordinates: [number, number] | null;
  pointingCategoryId: string | null;
  editingItem: ItemData | null;
  setPointingCategoryId: (id: string | null) => void;
  setIsItemEditOpen: (newState: boolean) => void;
  openItemCreating: (coordinates: [number, number]) => void;
  openItemUpdating: (id: string) => void;
  updateSubmittedItem: (newData: ItemData | null, id?: string) => void;
  quitFromCreatingNewItem: () => void;
  // Updating item coordinates
  relocateItem: (id: string | null) => void;
  relocatingItem: ItemData | null;
  updateItemCoordinates: (coordinates: [number, number]) => void;
}
