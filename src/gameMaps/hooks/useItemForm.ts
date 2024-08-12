import { ItemData } from '@/gameMaps/types';

import ItemValidator from '@/gameMaps/validators/item';

import { validate } from '@/common/utils/validators';

import createItem from '@/gameMaps/handlers/client/createItem';
import updateItem from '@/gameMaps/handlers/client/updateItem';
import deleteItem from '@/gameMaps/handlers/client/deleteItem';

import useForm from '@/common/hooks/useForm';

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
  const {
    loading,
    errors,
    addErrors,
    values,
    setters,
    isEditing: isEditForm,
    clear,
    prepareForEdit,
    onDelete,
    onSubmit,
  } = useForm<{
    description: string;
    collected: boolean;
  }>({
    defaultValues: { description: '', collected: false },
    attributes: data?.attributes,
    onDelete: async () => {
      if (data) {
        await deleteItem(gameId, data.id);
        onFinish?.(null);
      }
    },
    onSubmit: async (values) => {
      await validate(new ItemValidator(values), addErrors);
      const responseData = data
        ? await updateItem(gameId, data.id, {
            ...values,
            playId,
            categoryId,
            coordinates,
          })
        : await createItem(gameId, {
            ...values,
            playId,
            categoryId,
            coordinates,
          });

      onFinish?.(responseData);
    },
  });

  return {
    prepareFormForEdit: prepareForEdit,
    cleanForm: clear,
    isEditForm,
    onSubmit,
    onDelete,
    values,
    setters: {
      setDescription: setters.setDescription,
      setCollected: setters.setCollected,
    },
    errors,
    loading,
  };
};

export default useItemForm;
