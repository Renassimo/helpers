import { useEffect } from 'react';

import usePlayForm from '@/gameMaps/hooks/usePlayForm';

import Modal from '@/common/components/Modal';
import PlayForm from '@/gameMaps/components/PlayForm';

import { PlayData } from '@/gameMaps/types';

const PlayFormModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
  onFinish,
  gameId,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data?: PlayData | null;
  onFinish: (newData: PlayData | null) => void;
  gameId: string;
}) => {
  const onModalClose = () => {
    setIsModalOpen(false);
    cleanForm();
  };

  const handleFinish = (newData: PlayData | null) => {
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
  } = usePlayForm(gameId, data, handleFinish);

  const handleDelete = async (): Promise<void> => {
    if (
      confirm(
        `Are you sure to delete "${
          data?.attributes.title ?? values.title
        }" play? Following action will also delete all found items related to this play.`
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
      title={`${isEditForm ? 'Update' : `Create new`} play`}
      loading={loading}
    >
      <PlayForm
        values={values}
        setters={setters}
        errors={errors}
        onDelete={isEditForm ? handleDelete : undefined}
      />
    </Modal>
  );
};

export default PlayFormModal;
