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
  data?: GameData;
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
    errors,
    loading,
  } = useGameForm(data, handleFinish);

  useEffect(() => {
    if (isModalOpen && isEditForm) {
      prepareFormForEdit();
    }
  }, [isModalOpen, isEditForm, prepareFormForEdit]);

  return (
    <Modal
      open={isModalOpen}
      onClose={onModalClose}
      onSubmit={onSubmit}
      title="Create new game"
      loading={loading}
    >
      <GameForm values={values} setters={setters} errors={errors} />
    </Modal>
  );
};

export default GameFormModal;
