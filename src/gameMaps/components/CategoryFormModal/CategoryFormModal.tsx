import { useEffect } from 'react';

import useCategoryForm from '@/gameMaps/hooks/useCategoryForm';

import Modal from '@/common/components/Modal';
import CategoryForm from '@/gameMaps/components/CategoryForm';

import { CategoryData } from '@/gameMaps/types';

const CategoryFormModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
  onFinish,
  gameId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data?: CategoryData | null;
  onFinish: (newData: CategoryData | null) => void;
  gameId: string;
}) => {
  const onModalClose = () => {
    setIsModalOpen(false);
    cleanForm();
  };

  const handleFinish = (newData: CategoryData | null) => {
    onFinish(newData);
    onModalClose();
  };

  const {
    isEditForm,
    values,
    setters,
    cleanForm,
    prepareFormForEdit,
    onSubmit,
    onDelete,
    errors,
    loading,
  } = useCategoryForm(gameId, data, handleFinish);

  const handleDelete = async (): Promise<void> => {
    if (
      confirm(
        `Are you sure to delete "${
          data?.attributes.title ?? values.title
        }" category? Following action will also delete all found items releated to this category.`
      )
    ) {
      await onDelete();
      handleFinish(null);
    }
  };

  useEffect(() => {
    if (isModalOpen && isEditForm) {
      prepareFormForEdit();
    }
  }, [isModalOpen, isEditForm]);

  return (
    <Modal
      open={isModalOpen}
      onClose={onModalClose}
      onSubmit={onSubmit}
      title={`${isEditForm ? 'Update' : `Create new`} category`}
      loading={loading}
    >
      <CategoryForm
        values={values}
        setters={setters}
        errors={errors}
        onDelete={isEditForm ? handleDelete : undefined}
      />
    </Modal>
  );
};

export default CategoryFormModal;
