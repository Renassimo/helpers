import { CategoryAttributes, CategoryData } from '@/gameMaps/types';

import CategoryValidator from '@/gameMaps/validators/category';

import { validate } from '@/common/utils/validators';

import createCategory from '@/gameMaps/handlers/client/createCategory';
import updateCategory from '@/gameMaps/handlers/client/updateCategory';
import deleteCategory from '@/gameMaps/handlers/client/deleteCategory';

import useForm from '@/common/hooks/useForm';

const useCategoryForm = (
  gameId: string,
  data?: CategoryData | null,
  onFinish?: (data: CategoryData | null) => void
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
  } = useForm<CategoryAttributes>({
    defaultValues: { title: '', description: '', color: '', itemsAmount: 0 },
    attributes: data?.attributes,
    onDelete: async () => {
      if (data) {
        await deleteCategory(gameId, data.id);
        onFinish?.(null);
      }
    },
    onSubmit: async (values) => {
      await validate(new CategoryValidator(values), addErrors);
      const responseData = data
        ? await updateCategory(gameId, data.id, values)
        : await createCategory(gameId, values);

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
      setColor: setters.setColor,
      setItemsAmount: setters.setItemsAmount,
    },
    errors,
    loading,
  };
};

export default useCategoryForm;
