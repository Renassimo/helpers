import { CategoriesState, ItemData } from '@/gameMaps/types';

const getCategoriesStateWithCountedItems = (
  categories: CategoriesState,
  items: ItemData[]
): CategoriesState => {
  items.forEach((item) => {
    const { categoryId, collected } = item.attributes;
    const category = categories[categoryId];
    if (!category) return;
    const { foundItemsAmount, collectedItemsAmount } = category.attributes;

    category.attributes.foundItemsAmount = (foundItemsAmount ?? 0) + 1;

    if (collected) {
      category.attributes.collectedItemsAmount =
        (collectedItemsAmount ?? 0) + 1;
    }
  });
  return categories;
};

export default getCategoriesStateWithCountedItems;
