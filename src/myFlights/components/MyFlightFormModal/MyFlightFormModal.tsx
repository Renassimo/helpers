import Modal from '@/common/components/Modal';

import { MyFlightData } from '@/myFlights/types';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import MyFlightForm from '@/myFlights/components/MyFlightForm';

const MyFlightFormModal = ({
  isModalOpen,
  setIsModalOpen,
  data,
  onFinish,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  data?: MyFlightData | null;
  onFinish: (newData: MyFlightData | null) => void;
}) => {
  const isEditForm = !!data;

  const { cleanUp } = useMyFlightsContext();

  const onSubmit = () => {
    onFinish(null);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    cleanUp();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={onModalClose}
      onSubmit={onSubmit}
      title={`${isEditForm ? 'Update' : `Create new`} flight`}
      loading={false}
    >
      <MyFlightForm />
    </Modal>
  );
};

export default MyFlightFormModal;
