import { Data } from '@/common/types/props';

export interface ItemAttributes {
  categoryId: string;
  collected: boolean;
  coordinates: object;
  description: string;
  imageUrl: string;
  playId: string;
}

export type ItemData = Data<ItemAttributes>;
