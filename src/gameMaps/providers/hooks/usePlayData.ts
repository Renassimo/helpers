import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import useAlerts from '@/common/hooks/alerts';

import { getAttributeObjectFromArray } from '@/common/utils/data';
import getCategoriesStateWithCountedItems from '@/gameMaps/utils/getCategoriesStateWithCountedItems';

import updateItem from '@/gameMaps/handlers/client/updateItem';

import {
  CategoriesState,
  CategoryAttributes,
  CategoryData,
  GameData,
  ItemData,
  ItemsState,
  PlayContextData,
  PlayData,
  PlayPageData,
} from '@/gameMaps/types';
import { CommonError } from '@/common/types/errors';

const usePlayData = (data: PlayPageData | null): PlayContextData => {
  const { createSuccessAlert, clearAll, createErrorAlert, createInfoAlert } =
    useAlerts();
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
  const [items, setItems] = useState(getAttributeObjectFromArray(itemsData));
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
            ...getCategoriesStateWithCountedItems(
              {
                [newData.id]: {
                  ...newData,
                  attributes: { ...newData.attributes, chosen: true },
                },
              },
              itemsList
            ),
          };
        });
        createSuccessAlert(`Categories were updated!`);
      }
      setEditingCategoryId(null);
    },
    []
  );

  // Item creating
  const [isItemEditOpen, setIsItemEditOpen] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [creatingItemCoordinates, setCreatingItemCoordinates] = useState<
    [number, number] | null
  >(null);
  const [pointingCategoryId, setPointingCategoryId] = useState<string | null>(
    null
  );
  const editingItem: ItemData | null = useMemo(
    () => (editingItemId ? items[editingItemId] : null),
    [editingItemId, items]
  );
  const openItemCreating = (coordinates: [number, number]) => {
    setCreatingItemCoordinates(coordinates);
    setIsItemEditOpen(true);
  };
  const openItemUpdating = (id: string) => {
    setEditingItemId(id);
    setIsItemEditOpen(true);
  };
  const updateSubmittedItem = useCallback(
    (newData: ItemData | null, id?: string) => {
      if (newData == null) {
        setItems((current) => {
          const newItemsState: ItemsState = {};
          for (const cat in current) {
            if (cat !== id) newItemsState[cat] = current[cat];
          }
          const newItemsList = Object.values(newItemsState);
          setCategories((current) =>
            getCategoriesStateWithCountedItems(current, newItemsList)
          );
          return newItemsState;
        });
        createSuccessAlert(`Item was deleted!`);
      } else {
        setItems((current) => {
          const newItemsState = {
            ...current,
            [newData.id]: newData,
          };
          const newItemsList = Object.values(newItemsState);
          setCategories((current) => ({
            ...current,
            ...getCategoriesStateWithCountedItems(
              {
                [newData.attributes.categoryId]:
                  current[newData.attributes.categoryId],
              },
              newItemsList
            ),
          }));
          return newItemsState;
        });
        createSuccessAlert(`Items were updated!`);
      }
      setEditingItemId(null);
      setPointingCategoryId(null);
      setCreatingItemCoordinates(null);
    },
    []
  );
  const quitFromCreatingNewItem = useCallback(() => {
    clearAll();
    setPointingCategoryId(null);
    setCreatingItemCoordinates(null);
    setIsItemEditOpen(false);
  }, [clearAll]);

  // updating item coordinates
  const [relocatingItemId, setRelocatingItemId] = useState<string | null>(null);
  const relocateItem = (id: string | null) => {
    if (id) setPointingCategoryId(null);
    setRelocatingItemId(id);
  };
  const relocatingItem: ItemData | null = useMemo(() => {
    if (!relocatingItemId) return null;

    const relocatingItemData = items[relocatingItemId];
    if (!relocatingItemData) return null;

    return relocatingItemData;
  }, [items, relocatingItemId]);

  const updateItemCoordinates = useCallback(
    async (coordinates: [number, number]) => {
      const gameId = game?.id;
      try {
        if (!gameId || !relocatingItemId || !coordinates)
          throw new Error('Not all parameters passed');
        clearAll();
        createInfoAlert(`Updating item coordinates...`);
        const data = await updateItem(gameId, relocatingItemId, {
          coordinates,
        });
        setRelocatingItemId(null);
        updateSubmittedItem(data);
        clearAll();
        createSuccessAlert(`Item coordinates updated`);
      } catch (error: unknown) {
        const { message } = error as CommonError;
        clearAll();
        createErrorAlert(message);
      }
    },
    [game, relocatingItemId]
  );

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
    items,
    itemsList,
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
    isItemEditOpen,
    setIsItemEditOpen,
    creatingItemCoordinates,
    editingItem,
    openItemCreating,
    openItemUpdating,
    updateSubmittedItem,
    relocateItem,
    relocatingItem,
    updateItemCoordinates,
  };
};

export default usePlayData;
