import { CategoriesState, ItemData } from '@/gameMaps/types';

const getCategoriesStateWithCountedItems = (
  categories: CategoriesState,
  items: ItemData[]
): CategoriesState => {
  items.forEach((element) => {
    const { categoryId, collected } = element.attributes;
    const { foundItemsAmount, collectedItemsAmount } =
      categories[categoryId].attributes;

    categories[categoryId].attributes.foundItemsAmount =
      (foundItemsAmount ?? 0) + 1;

    if (collected) {
      categories[categoryId].attributes.collectedItemsAmount =
        (collectedItemsAmount ?? 0) + 1;
    }
  });
  return categories;
};

export default getCategoriesStateWithCountedItems;
