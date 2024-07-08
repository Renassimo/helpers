import { useState } from 'react';

import { GameData } from '@/gameMaps/types';
import { FileWithPreview } from '@/common/types/files';

const useGameForm = (data?: GameData) => {
  const isEditForm = !!data;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [mapImageUrl, setMapImageUrl] = useState('');
  const [mapImage, setMapImage] = useState<FileWithPreview | null>(null);

  const cleanForm = () => {
    setTitle('');
    setDescription('');
    setBackgroundColor('');
    setMapImageUrl('');
    setMapImage(null);
  };

  const prepareFormForEdit = () => {
    if (data) {
      const { attributes } = data;
      setTitle(attributes.title);
      setDescription(attributes.description);
      setBackgroundColor(attributes.backgroundColor);
      setMapImageUrl(attributes.mapImageUrl);
    }
  };

  const onSubmit = () => {
    console.log({
      title,
      description,
      backgroundColor,
      mapImageUrl,
      mapImage,
    });
  };

  return {
    prepareFormForEdit,
    cleanForm,
    isEditForm,
    onSubmit,
    values: {
      title,
      description,
      backgroundColor,
      mapImageUrl,
      mapImage,
    },
    setters: {
      setTitle,
      setDescription,
      setBackgroundColor,
      setMapImageUrl,
      setMapImage,
    },
  };
};

export default useGameForm;
