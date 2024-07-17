import { useState } from 'react';

import { PlayData } from '@/gameMaps/types';

import PlayValidator from '@/gameMaps/validators/play';

import useErrors from '@/common/hooks/useErrors';

import { CommonError } from '@/common/types/errors';

import { validate } from '@/common/utils/validators';

import createPlay from '@/gameMaps/handlers/client/createPlay';
import updatePlay from '@/gameMaps/handlers/client/updatePlay';
import deletePlay from '@/gameMaps/handlers/client/deletePlay';

const usePlayForm = (
  gameId: string,
  data?: PlayData | null,
  onFinish?: (data: PlayData | null) => void
) => {
  const isEditForm = !!data;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { errors, addErrors, cleanErrors } = useErrors();

  const cleanForm = () => {
    setTitle('');
    setDescription('');
    cleanErrors();
  };

  const prepareFormForEdit = () => {
    if (data) {
      const { attributes } = data;
      setTitle(attributes.title);
      setDescription(attributes.description);
    }
  };

  const onDelete = async (): Promise<void> => {
    if (isEditForm) {
      setLoading(true);
      try {
        await deletePlay(gameId, data.id);
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
    try {
      await validate(new PlayValidator({ title, description }), addErrors);
      const payload = {
        title,
        description,
      };
      const responseData = isEditForm
        ? await updatePlay(gameId, data.id, payload)
        : await createPlay(gameId, payload);

      onFinish?.(responseData);
      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
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
    },
    setters: {
      setTitle,
      setDescription,
    },
    errors,
    loading,
  };
};

export default usePlayForm;
