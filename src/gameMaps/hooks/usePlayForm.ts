import { PlayAttributes, PlayData } from '@/gameMaps/types';

import PlayValidator from '@/gameMaps/validators/play';

import { validate } from '@/common/utils/validators';

import createPlay from '@/gameMaps/handlers/client/createPlay';
import updatePlay from '@/gameMaps/handlers/client/updatePlay';
import deletePlay from '@/gameMaps/handlers/client/deletePlay';

import useForm from '@/common/hooks/useForm';

const usePlayForm = (
  gameId: string,
  data?: PlayData | null,
  onFinish?: (data: PlayData | null) => void
) => {
  const {
    errors,
    loading,
    values,
    setters,
    isEditing,
    addErrors,
    clear,
    prepareForEdit,
    onDelete,
    onSubmit,
  } = useForm<PlayAttributes>({
    defaultValues: { title: '', description: '' },
    attributes: data?.attributes,
    onDelete: async () => {
      if (data) {
        await deletePlay(gameId, data.id);
        onFinish?.(null);
      }
    },
    onSubmit: async (values) => {
      await validate(new PlayValidator(values), addErrors);
      const responseData = data
        ? await updatePlay(gameId, data.id, values)
        : await createPlay(gameId, values);

      onFinish?.(responseData);
    },
  });

  return {
    prepareFormForEdit: prepareForEdit,
    cleanForm: clear,
    isEditForm: isEditing,
    onSubmit,
    onDelete,
    values,
    setters: {
      setTitle: setters.setTitle,
      setDescription: setters.setDescription,
    },
    errors,
    loading,
  };
};

export default usePlayForm;
