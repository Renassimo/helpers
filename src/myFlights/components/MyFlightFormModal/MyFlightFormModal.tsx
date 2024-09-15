import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Typography from '@mui/material/Typography';

import Modal from '@/common/components/Modal';

import useMyFlightsContext from '@/myFlights/contexts/hooks/useMyFlightsContext';

import SearchMyFlightDetailsForm from '@/myFlights/components/SearchMyFlightDetailsForm';
import MyFlightForm from '@/myFlights/components/MyFlightForm';

const ModalWrapper = styled.main(
  ({ theme }) => css`
    min-width: 325px;
    ${theme.breakpoints.up('md')} {
      width: 400px;
    }
  `
);

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
      <ModalWrapper>
        <SearchMyFlightDetailsForm />
        <Typography mt={3} component="h4" variant="h6">
          Fix values or enter mannually bellow:
        </Typography>
        <MyFlightForm />
      </ModalWrapper>
    </Modal>
  );
};

export default MyFlightFormModal;
