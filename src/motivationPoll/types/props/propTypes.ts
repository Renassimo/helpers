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
