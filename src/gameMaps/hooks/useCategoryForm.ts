import { useState } from 'react';

import { CategoryData } from '@/gameMaps/types';

import CategoryValidator from '@/gameMaps/validators/category';

import useErrors from '@/common/hooks/useErrors';

import { CommonError } from '@/common/types/errors';

import { validate } from '@/common/utils/validators';

import createCategory from '@/gameMaps/handlers/client/createCategory';
import updateCategory from '@/gameMaps/handlers/client/updateCategory';
import deleteCategory from '@/gameMaps/handlers/client/deleteCategory';

const useCategoryForm = (
  gameId: string,
  data?: CategoryData | null,
  onFinish?: (data: CategoryData | null) => void
) => {
  const isEditForm = !!data;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [itemsAmount, setItemsAmount] = useState(0);

  const { errors, addErrors, cleanErrors } = useErrors();

  const cleanForm = () => {
    setTitle('');
    setDescription('');
    setColor('');
    setItemsAmount(0);
    cleanErrors();
  };

  const prepareFormForEdit = () => {
    if (data) {
      const { attributes } = data;
      setTitle(attributes.title);
      setDescription(attributes.description);
      setColor(attributes.color);
      setItemsAmount(attributes.itemsAmount);
    }
  };

  const onDelete = async (): Promise<void> => {
    if (isEditForm) {
      setLoading(true);
      try {
        await deleteCategory(gameId, data.id);
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
      await validate(
        new CategoryValidator({ title, description, color, itemsAmount }),
        addErrors
      );
      const payload = {
        title,
        description,
        color,
        itemsAmount,
      };
      const responseData = isEditForm
        ? await updateCategory(gameId, data.id, payload)
        : await createCategory(gameId, payload);

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
      color,
      itemsAmount,
    },
    setters: {
      setTitle,
      setDescription,
      setColor,
      setItemsAmount,
    },
    errors,
    loading,
  };
};

export default useCategoryForm;
