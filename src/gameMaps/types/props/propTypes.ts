import { Dispatch, SetStateAction } from 'react';

import { FileWithPreview } from '@/common/types/files';

interface FormProps<V, S> {
  values: V;
  setters: S;
  onDelete?: () => Promise<void>;
  errors: Record<string, string>;
  isReady?: boolean;
}

export type GameFormProps = FormProps<
  {
    title: string;
    description: string;
    backgroundColor: string;
    mapImageUrl?: string;
    mapImage: FileWithPreview | null;
  },
  {
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setBackgroundColor: (value: string) => void;
    setMapImage: Dispatch<SetStateAction<FileWithPreview | null>>;
  }
>;

export type PlayFormProps = FormProps<
  {
    title: string;
    description: string;
  },
  {
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
  }
>;

export type CategoryFormProps = FormProps<
  {
    title: string;
    description: string;
    color: string;
    itemsAmount: number;
  },
  {
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    setColor: (value: string) => void;
    setItemsAmount: (value: number) => void;
  }
>;

export type ItemFormProps = FormProps<
  {
    description: string;
    collected: boolean;
  },
  {
    setDescription: (value: string) => void;
    setCollected: (value: boolean) => void;
  }
>;
