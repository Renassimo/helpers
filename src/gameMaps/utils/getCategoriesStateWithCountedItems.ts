import { CategoriesState, ItemData } from '@/gameMaps/types';

const getCategoriesStateWithCountedItems = (
  categories: CategoriesState,
  items: ItemData[]
): CategoriesState => {
  const newCategories: CategoriesState = {};

  for (const id in categories) {
    newCategories[id] = {
      id,
      attributes: {
        ...categories[id].attributes,
        foundItemsAmount: 0,
        collectedItemsAmount: 0,
      },
    };
  }

  items.forEach((item) => {
    const { categoryId, collected } = item.attributes;
    const category = newCategories[categoryId];
    if (!category) return;
    const { foundItemsAmount, collectedItemsAmount } = category.attributes;

    category.attributes.foundItemsAmount = (foundItemsAmount ?? 0) + 1;

    if (collected) {
      category.attributes.collectedItemsAmount =
        (collectedItemsAmount ?? 0) + 1;
    }
  });

  return newCategories;
};

export default getCategoriesStateWithCountedItems;
