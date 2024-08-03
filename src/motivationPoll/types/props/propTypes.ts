import { Dispatch, SetStateAction } from 'react';

import { FileWithPreview } from '@/common/types/files';

export interface GameFormProps {
  values: {
    title: string;
    description: string;
    backgroundColor: string;
    mapImageUrl?: string;
    mapImage: FileWithPreview | null;
  };
  setters: {
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setBackgroundColor: (value: string) => void;
    setMapImage: Dispatch<SetStateAction<FileWithPreview | null>>;
  };
  onDelete?: () => Promise<void>;
  errors: Record<string, string>;
}

export interface PlayFormProps {
  values: {
    title: string;
    description: string;
  };
  setters: {
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
  };
  onDelete?: () => Promise<void>;
  errors: Record<string, string>;
}

export interface CategoryFormProps {
  values: {
    title: string;
    description: string;
    color: string;
    itemsAmount: number;
  };
  setters: {
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setColor: (value: string) => void;
    setItemsAmount: (value: number) => void;
  };
  onDelete?: () => Promise<void>;
  errors: Record<string, string>;
}

export interface ItemFormProps {
  values: {
    description: string;
    collected: boolean;
  };
  setters: {
    setDescription: (value: string) => void;
    setCollected: (value: boolean) => void;
  };
  onDelete?: () => Promise<void>;
  errors: Record<string, string>;
}
