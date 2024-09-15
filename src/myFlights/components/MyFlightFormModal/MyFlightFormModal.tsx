import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Modal from '@/common/components/Modal';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import SearchMyFlightDetailsForm from '@/myFlights/components/SearchMyFlightDetailsForm';
import MyFlightForm from '@/myFlights/components/MyFlightForm';

const MyFlightFormModal = () => {
  const {
    myFlightForm: { isModalOpen, closeModal, isEditing, onSubmit, loading },
  } = useMyFlightsContext();

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      onSubmit={onSubmit}
      title={`${isEditing ? 'Update' : `Create new`} flight`}
      loading={loading}
    >
      <Box minWidth={325}>
        <SearchMyFlightDetailsForm />
        <Typography mt={3} component="h4" variant="h6">
          Fix values or enter mannually bellow:
        </Typography>
        <MyFlightForm />
      </Box>
    </Modal>
  );
};

export default MyFlightFormModal;
