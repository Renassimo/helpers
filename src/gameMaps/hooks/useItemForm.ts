import { useState } from 'react';

import { ItemData } from '@/gameMaps/types';

import ItemValidator from '@/gameMaps/validators/item';

import useErrors from '@/common/hooks/useErrors';

import { CommonError } from '@/common/types/errors';

import { validate } from '@/common/utils/validators';

import createItem from '@/gameMaps/handlers/client/createItem';
import updateItem from '@/gameMaps/handlers/client/updateItem';
import deleteItem from '@/gameMaps/handlers/client/deleteItem';

const useItemForm = (
  {
    gameId,
    playId,
    categoryId,
    coordinates,
  }: {
    gameId: string;
    playId: string;
    categoryId: string;
    coordinates: [number, number];
  },
  data?: ItemData | null,
  onFinish?: (data: ItemData | null) => void
) => {
  const isEditForm = !!data;
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [collected, setCollected] = useState(false);

  const { errors, addErrors, cleanErrors } = useErrors();

  const cleanForm = () => {
    setDescription('');
    setCollected(false);
    cleanErrors();
  };

  const prepareFormForEdit = () => {
    if (data) {
      const { attributes } = data;
      setDescription(attributes.description);
      setCollected(attributes.collected);
    }
  };

  const onDelete = async (): Promise<void> => {
    if (isEditForm) {
      setLoading(true);
      try {
        await deleteItem(gameId, data.id);
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
      await validate(new ItemValidator({ description, collected }), addErrors);
      const payload = {
        description,
        collected,
      };
      const responseData = isEditForm
        ? await updateItem(gameId, data.id, {
            ...payload,
            playId,
            categoryId,
            coordinates,
          })
        : await createItem(gameId, {
            ...payload,
            playId,
            categoryId,
            coordinates,
          });

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
      description,
      collected,
    },
    setters: {
      setDescription,
      setCollected,
    },
    errors,
    loading,
  };
};

export default useItemForm;
