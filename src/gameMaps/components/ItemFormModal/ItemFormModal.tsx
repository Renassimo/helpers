import { useEffect } from 'react';

import useItemForm from '@/gameMaps/hooks/useItemForm';

import Modal from '@/common/components/Modal';
import ItemForm from '@/gameMaps/components/ItemForm';

import { ItemData } from '@/gameMaps/types';

const ItemFormModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
  onFinish,
  gameId,
  coordinates,
  playId,
  categoryId,
  clearData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data?: ItemData | null;
  onFinish: (newData: ItemData | null, id?: string) => void;
  gameId: string;
  coordinates: [number, number];
  playId: string;
  categoryId: string;
  clearData?: () => void;
}) => {
  const onModalClose = () => {
    setIsModalOpen(false);
    cleanForm();
  };

  const handleFinish = (newData: ItemData | null) => {
    onFinish(newData, data?.id);
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
  } = useItemForm(
    { gameId, playId, categoryId, coordinates },
    data,
    handleFinish
  );

  const handleDelete = async (): Promise<void> => {
    if (confirm(`Are you sure to delete this item?`)) {
      await onDelete();
      handleFinish(null);
    }
  };

  useEffect(() => {
    if (isModalOpen && isEditForm) {
      prepareFormForEdit();
    }
  }, [isModalOpen, isEditForm]);

  // Clears data when closes modal
  useEffect(() => {
    if (!isModalOpen && isEditForm) {
      clearData?.();
    }
  }, [isModalOpen, isEditForm]);

  return (
    <Modal
      open={isModalOpen}
      onClose={onModalClose}
      onSubmit={onSubmit}
      title={`${isEditForm ? 'Update' : `Create new`} item`}
      loading={loading}
    >
      <ItemForm
        values={values}
        setters={setters}
        errors={errors}
        onDelete={isEditForm ? handleDelete : undefined}
        isReady={isModalOpen}
      />
    </Modal>
  );
};

export default ItemFormModal;
