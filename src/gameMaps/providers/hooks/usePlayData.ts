import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import useAlerts from '@/common/hooks/alerts';

import { getAttributeObjectFromArray } from '@/common/utils/data';
import getCategoriesStateWithCountedItems from '@/gameMaps/utils/getCategoriesStateWithCountedItems';

import {
  CategoriesState,
  CategoryAttributes,
  CategoryData,
  GameData,
  ItemData,
  PlayContextData,
  PlayData,
  PlayPageData,
} from '@/gameMaps/types';

const usePlayData = (data: PlayPageData | null): PlayContextData => {
  const { createSuccessAlert, clearAll } = useAlerts();
  const { push } = useRouter();

  const {
    gameData = null,
    playData = null,
    categoriesData = [],
    itemsData = [],
  } = data ?? {};

  // Game and Play data
  const [game] = useState<GameData | null>(gameData);
  const [play, setPlay] = useState<PlayData | null>(playData);

  // Items data
  const [items] = useState(getAttributeObjectFromArray(itemsData));
  const itemsList: ItemData[] = useMemo(() => Object.values(items), [items]);

  // Categories data
  const [categories, setCategories] = useState<CategoriesState>(
    getCategoriesStateWithCountedItems(
      getAttributeObjectFromArray<
        CategoryAttributes,
        {
          chosen: true;
        }
      >(categoriesData, {
        chosen: true,
      }),
      itemsList
    )
  );
  const categoriesList: CategoryData[] = useMemo(
    () => Object.values(categories),
    [categories]
  );

  // Categories chosing
  const choseCategories = useCallback((chosen = true) => {
    setCategories((currentCategories: CategoriesState) => {
      const updateCategories: CategoriesState = {};
      for (const property in currentCategories) {
        updateCategories[property] = {
          ...currentCategories[property],
          attributes: {
            ...currentCategories[property].attributes,
            chosen,
          },
        };
      }
      return updateCategories;
    });
  }, []);
  const choseAllCategories = useCallback(
    () => choseCategories(true),
    [choseCategories]
  );
  const clearAllChosenCategories = useCallback(
    () => choseCategories(false),
    [choseCategories]
  );
  const changeCategoryChoose = useCallback(
    (categoryId: string, chosen: boolean) => {
      setCategories((currentCategories: CategoriesState) => ({
        ...currentCategories,
        [categoryId]: {
          ...currentCategories[categoryId],
          attributes: {
            ...currentCategories[categoryId].attributes,
            chosen,
          },
        },
      }));
    },
    []
  );
  const isEveryCategoryChosen = useMemo(
    () => categoriesList.every((category) => category.attributes.chosen),
    [categoriesList]
  );
  const isNoCategoriesChosen = useMemo(
    () => categoriesList.every((category) => !category.attributes.chosen),
    [categoriesList]
  );

  // Visible Items depending on choise
  const visibleItems: ItemData[] = useMemo(
    () =>
      itemsList?.filter(
        (item: ItemData) =>
          categories[item.attributes.categoryId]?.attributes.chosen
      ),
    [itemsList, categories]
  );

  // Play editing
  const [isPlayEditOpen, setIsPlayEditOpen] = useState<boolean>(false);
  const updateSubmittedPlay = useCallback((newData: PlayData | null) => {
    if (newData == null) {
      setPlay(null);
      push(`/gameMaps/games/${game?.id}`);
      createSuccessAlert(`Play was deleted!`);
    } else {
      createSuccessAlert(`"${newData.attributes.title}" play was updated!`);
      setPlay(newData);
    }
  }, []);

  // Category editing and creating
  const [isCategoryEditOpen, setIsCategoryEditOpen] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const editingCategory: CategoryData | null = useMemo(
    () => (editingCategoryId ? categories[editingCategoryId] : null),
    [editingCategoryId, categories]
  );
  const openCategoryCreating = () => setIsCategoryEditOpen(true);
  const openCategoryUpdating = (id: string) => {
    setEditingCategoryId(id);
    setIsCategoryEditOpen(true);
  };
  const updateSubmittedCategory = useCallback(
    (newData: CategoryData | null, id?: string) => {
      if (newData == null) {
        setCategories((current) => {
          const newState: CategoriesState = {};
          for (const cat in current) {
            if (cat !== id) newState[cat] = current[cat];
          }
          return newState;
        });
        createSuccessAlert(`Category was deleted!`);
      } else {
        setCategories((current) => {
          return {
            ...current,
            [newData.id]: newData,
          };
        });
        createSuccessAlert(`Categories were updated!`);
      }
      setEditingCategoryId(null);
    },
    []
  );

  // Item creating
  const [pointingCategoryId, setPointingCategoryId] = useState<string | null>(
    null
  );
  const quitFromCreatingNewItem = useCallback(() => {
    clearAll();
    setPointingCategoryId(null);
  }, [clearAll]);

  return {
    game,
    play,
    updateSubmittedPlay,
    isPlayEditOpen,
    setIsPlayEditOpen,
    categories,
    categoriesList,
    isEveryCategoryChosen,
    isNoCategoriesChosen,
    items: itemsList,
    visibleItems,
    choseAllCategories,
    clearAllChosenCategories,
    changeCategoryChoose,
    pointingCategoryId,
    setPointingCategoryId,
    quitFromCreatingNewItem,
    updateSubmittedCategory,
    isCategoryEditOpen,
    setIsCategoryEditOpen,
    editingCategory,
    openCategoryCreating,
    openCategoryUpdating,
  };
};

export default usePlayData;
