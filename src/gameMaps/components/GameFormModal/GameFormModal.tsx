import { useEffect } from 'react';

import useGameForm from '@/gameMaps/hooks/useGameForm';

import Modal from '@/common/components/Modal';
import GameForm from '@/gameMaps/components/GameForm';

import { GameData } from '@/gameMaps/types';

const GameFormModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
  onFinish,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data?: GameData | null;
  onFinish: (newData: GameData | null) => void;
}) => {
  const onModalClose = () => {
    setIsModalOpen(false);
    cleanForm();
  };

  const handleFinish = (newData: GameData | null) => {
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
  } = useGameForm(data, handleFinish);

  const handleDelete = async (): Promise<void> => {
    if (
      confirm(
        `Are you sure to delete ${
          data?.attributes.title ?? values.title
        } game? Following action will also delete all plays, categories and map image.`
      )
    ) {
      await onDelete();
      onModalClose();
      onFinish(null);
    }
  };

  useEffect(() => {
    if (isModalOpen && isEditForm) {
      console.log('prepareFormForEdit');
      prepareFormForEdit();
    }
  }, [isModalOpen, isEditForm]);

  return (
    <Modal
      open={isModalOpen}
      onClose={onModalClose}
      onSubmit={onSubmit}
      title="Create new game"
      loading={loading}
    >
      <GameForm
        values={values}
        setters={setters}
        errors={errors}
        onDelete={isEditForm ? handleDelete : undefined}
      />
    </Modal>
  );
};

export default GameFormModal;
