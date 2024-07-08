import { useEffect } from 'react';

import useGameForm from '@/gameMaps/hooks/useGameForm';

import Modal from '@/common/components/Modal';
import GameForm from '@/gameMaps/components/GameForm';

import { GameData } from '@/gameMaps/types';

const GameFormModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data?: GameData;
}) => {
  const {
    isEditForm,
    values,
    setters,
    cleanForm,
    prepareFormForEdit,
    onSubmit,
  } = useGameForm(data);

  const onModalClose = () => {
    setIsModalOpen(false);
    cleanForm();
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
      title="Create new game"
      loading={false}
    >
      <GameForm values={values} setters={setters} />
    </Modal>
  );
};

export default GameFormModal;
