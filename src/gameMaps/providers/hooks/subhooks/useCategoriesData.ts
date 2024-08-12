import { useCallback, useMemo, useState } from 'react';

import { getAttributeObjectFromArray } from '@/common/utils/data';
import getCategoriesStateWithCountedItems from '@/gameMaps/utils/getCategoriesStateWithCountedItems';

import {
  CategoriesState,
  CategoryAttributes,
  CategoryData,
  ItemData,
} from '@/gameMaps/types';

const useCategoriesData = (
  categoriesData: CategoryData[],
  itemsList: ItemData[]
): {
  categories: CategoriesState;
  updateCategory: (category: CategoryData | null, id?: string) => void;
  recountCategories: (newItemsList: ItemData[]) => void;
  categoriesList: CategoryData[];
  visibleItems: ItemData[];
  choseAllCategories: () => void;
  clearAllChosenCategories: () => void;
  changeCategoryChoose: (categoryId: string, chosen: boolean) => void;
  isEveryCategoryChosen: boolean;
  isNoCategoriesChosen: boolean;
} => {
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

  const recountCategories = useCallback((newItemsList: ItemData[]) => {
    setCategories((current) =>
      getCategoriesStateWithCountedItems(current, newItemsList)
    );
  }, []);

  const updateCategory = useCallback(
    (category: CategoryData | null, id?: string) => {
      if (category) {
        setCategories((currentCategories: CategoriesState) => ({
          ...currentCategories,
          ...getCategoriesStateWithCountedItems(
            { [category.id]: category },
            itemsList
          ),
        }));
      } else {
        setCategories((currentCategories) => {
          const newState: CategoriesState = {};
          for (const cat in currentCategories) {
            if (cat !== id) newState[cat] = currentCategories[cat];
          }
          return newState;
        });
      }
    },
    []
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

  return {
    categories,
    updateCategory,
    recountCategories,
    categoriesList,
    visibleItems,
    choseAllCategories,
    clearAllChosenCategories,
    changeCategoryChoose,
    isEveryCategoryChosen,
    isNoCategoriesChosen,
  };
};

export default useCategoriesData;
