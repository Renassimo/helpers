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
  errors: Record<string, string>;
}
