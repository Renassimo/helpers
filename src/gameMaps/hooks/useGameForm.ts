import { useState } from 'react';

import { GameData } from '@/gameMaps/types';
import { FileWithPreview } from '@/common/types/files';

import GameValidator from '@/gameMaps/validators/game';

import useErrors from '@/common/hooks/useErrors';

import { CommonError } from '@/common/types/errors';

import { validate } from '@/common/utils/validators';

import uploadFile from '@/common/lib/firebase/utils/uploadFile';

const useGameForm = (data?: GameData) => {
  const isEditForm = !!data;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [mapImageUrl, setMapImageUrl] = useState('');
  const [mapImage, setMapImage] = useState<FileWithPreview | null>(null);

  const { errors, addErrors, cleanErrors } = useErrors();

  const cleanForm = () => {
    setTitle('');
    setDescription('');
    setBackgroundColor('');
    setMapImageUrl('');
    setMapImage(null);
    cleanErrors();
  };

  const prepareFormForEdit = () => {
    if (data) {
      const { attributes } = data;
      setTitle(attributes.title);
      setDescription(attributes.description);
      setBackgroundColor(attributes.backgroundColor);
      if (attributes.mapImageUrl) setMapImageUrl(attributes.mapImageUrl);
    }
  };

  const onSubmit = async () => {
    try {
      await validate(
        new GameValidator({ title, description, backgroundColor }),
        addErrors
      );
      let mapImageId: string;
      if (mapImage) {
        mapImageId = await uploadFile(mapImage, title);
        console.log(mapImageId);
      }
    } catch (error: unknown) {
      const main = (error as CommonError).message ?? 'Error happened';
      addErrors({ main });
    }
    console.log({
      title,
      description,
      backgroundColor,
      mapImageUrl,
      mapImage,
    });
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
