import { Data } from '@/common/types/props';

export interface ItemAttributes {
  categoryId: string;
  collected: boolean;
  coordinates: [number, number];
  description: string;
  imageUrl?: string;
  playId?: string;
  collectedByPlayId?: {
    [key: string]: boolean;
  };
  recent?: boolean;
}

export interface ItemMarker {
  id?: string;
  attributes: {
    [key: string]: any;
    coordinates: [number, number];
    description: string | JSX.Element;
    categoryId: string;
  };
}

export interface ItemsState {
  [id: string]: ItemData;
}

export type ItemData = Data<ItemAttributes>;
