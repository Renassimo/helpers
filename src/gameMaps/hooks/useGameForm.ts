import { useState } from 'react';

import { GameData } from '@/gameMaps/types';
import { FileWithPreview } from '@/common/types/files';

import GameValidator from '@/gameMaps/validators/game';

import { CommonError } from '@/common/types/errors';

const useGameForm = (data?: GameData) => {
  const isEditForm = !!data;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [mapImageUrl, setMapImageUrl] = useState('');
  const [mapImage, setMapImage] = useState<FileWithPreview | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cleanForm = () => {
    setTitle('');
    setDescription('');
    setBackgroundColor('');
    setMapImageUrl('');
    setMapImage(null);
    setErrors({});
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

  const validate = async () => {
    const game = new GameValidator({
      title,
      description,
      backgroundColor,
    });
    const validationErrors = await game.validate();
    setErrors(validationErrors.messages);
    if (validationErrors.hasError)
      throw new Error('Some of fields are not valid');
  };

  const onSubmit = async () => {
    try {
      await validate();
    } catch (error: unknown) {
      const main = (error as CommonError).message ?? 'Error happened';
      setErrors((current) => ({ ...current, main }));
    }
    console.log({
      title,
      description,
      backgroundColor,
      mapImageUrl,
      mapImage,
    });
    // upload image
    // save game (delete image if fails)
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
    errors,
  };
};

export default useGameForm;
