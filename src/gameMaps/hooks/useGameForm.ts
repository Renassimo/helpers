import { useEffect, useState } from 'react';

import { GameAttributes, GameData } from '@/gameMaps/types';
import { FileWithPreview } from '@/common/types/files';

import GameValidator from '@/gameMaps/validators/game';

import { updateImageRatio } from '@/common/utils/files';

import uploadFile from '@/common/lib/firebase/utils/uploadFile';
import deleteFile from '@/common/lib/firebase/utils/deleteFile';

import createGame from '@/gameMaps/handlers/client/createGame';
import updateGame from '@/gameMaps/handlers/client/updateGame';
import deleteGame from '@/gameMaps/handlers/client/deleteGame';

import useForm from '@/common/hooks/useForm';

const useGameForm = (
  data?: GameData | null,
  onFinish?: (data: GameData | null) => void
) => {
  const [mapImage, setMapImage] = useState<FileWithPreview | null>(null);
  const [mapImageRatio, setMapImageRatio] = useState<number | null>(null);

  const {
    isEditing: isEditForm,
    loading,
    errors,
    values,
    setters,
    clear,
    prepareForEdit,
    onDelete,
    onSubmit,
  } = useForm<GameAttributes, GameValidator>({
    defaultValues: {
      title: '',
      description: '',
      backgroundColor: '',
      mapImageUrl: '',
    },
    attributes: data?.attributes,
    onDelete: async () => {
      if (data) {
        await deleteGame(data.id);
        onFinish?.(null);
      }
    },
    onSubmit: async (values) => {
      let mapImageId;
      try {
        const { title, description, backgroundColor } = values;
        if (mapImage) {
          mapImageId = await uploadFile(mapImage, `gameMap-${title}`);
        }
        const withMapImageId: {
          mapImageId?: string;
          mapImageRatio?: number | null;
        } = mapImageId ? { mapImageId, mapImageRatio } : {};
        const payload = {
          title,
          description,
          backgroundColor,
          ...withMapImageId,
        };
        const responseData = data
          ? await updateGame(data.id, payload)
          : await createGame(payload);

        onFinish?.(responseData);
      } catch (error: unknown) {
        deleteFile(mapImageId);
        throw error;
      }
    },
    getValidator: ({ title, description, backgroundColor }) =>
      new GameValidator({ title, description, backgroundColor }),
  });

  useEffect(() => updateImageRatio(mapImage, setMapImageRatio), [mapImage]);

  return {
    prepareFormForEdit: prepareForEdit,
    cleanForm: clear,
    isEditForm,
    onSubmit,
    onDelete,
    values: {
      ...values,
      mapImage,
    },
    setters: {
      setTitle: setters.setTitle,
      setDescription: setters.setDescription,
      setBackgroundColor: setters.setBackgroundColor,
      setMapImageUrl: setters.setMapImageUrl,
      setMapImage,
    },
    errors,
    loading,
  };
};

export default useGameForm;
