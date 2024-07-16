import { useState } from 'react';

import { GameData } from '@/gameMaps/types';
import { FileWithPreview } from '@/common/types/files';

import GameValidator from '@/gameMaps/validators/game';

import useErrors from '@/common/hooks/useErrors';

import { CommonError } from '@/common/types/errors';

import { validate } from '@/common/utils/validators';

import uploadFile from '@/common/lib/firebase/utils/uploadFile';
import deleteFile from '@/common/lib/firebase/utils/deleteFile';

import createGame from '@/gameMaps/handlers/client/createGame';
import updateGame from '@/gameMaps/handlers/client/updateGame';
import deleteGame from '../handlers/client/deleteGame';

const useGameForm = (
  data?: GameData,
  onFinish?: (data: GameData | null) => void
) => {
  const isEditForm = !!data;
  const [loading, setLoading] = useState(false);
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

  const onDelete = async (): Promise<void> => {
    if (isEditForm) {
      setLoading(true);
      try {
        await deleteGame(data.id);
        onFinish?.(null);
        setLoading(false);
      } catch (error: unknown) {
        setLoading(false);
        const main = (error as CommonError).message ?? 'Error happened';
        addErrors({ main });
      }
    }
  };

  const onSubmit = async (): Promise<void> => {
    setLoading(true);
    let mapImageId;
    try {
      console.log({ title, description, backgroundColor });
      await validate(
        new GameValidator({ title, description, backgroundColor }),
        addErrors
      );
      if (mapImage) {
        mapImageId = await uploadFile(mapImage, title);
      }
      const withMapImageId: { mapImageId?: string } = mapImageId
        ? { mapImageId }
        : {};
      const payload = {
        title,
        description,
        backgroundColor,
        ...withMapImageId,
      };
      const responseData = isEditForm
        ? await updateGame(payload, data.id)
        : await createGame(payload);

      onFinish?.(responseData);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      deleteFile(mapImageId);
      const main = (error as CommonError).message ?? 'Error happened';
      addErrors({ main });
    }
  };

  return {
    prepareFormForEdit,
    cleanForm,
    isEditForm,
    onSubmit,
    onDelete,
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
    loading,
  };
};

export default useGameForm;
