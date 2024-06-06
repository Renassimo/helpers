import { Data } from '@/common/types/props';

export interface CategoryAttributes {
  color: string;
  description: string;
  title: string;
  itemsAmount: number;
}

export type CategoryData = Data<CategoryAttributes>;
