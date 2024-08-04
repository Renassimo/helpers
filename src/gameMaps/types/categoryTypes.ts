import { Data } from '@/common/types/props';

export interface CategoryAttributes {
  color: string;
  description: string;
  title: string;
  itemsAmount: number;
  foundItemsAmount?: number;
  collectedItemsAmount?: number;
  chosen?: boolean;
}

export interface CategoriesState {
  [id: string]: CategoryData;
}

export type CategoryData = Data<CategoryAttributes>;
