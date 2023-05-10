import React from 'react';

import Button from '@mui/material/Button';

const GroupPostInfoAlert = ({
  selectedCount,
  onOpenModal,
  clearSelectedIds,
}: {
  selectedCount: number;
  onOpenModal: () => void;
  clearSelectedIds: () => void;
}) => (
  <span>
    Create group post from {selectedCount} planes?{' '}
    <Button type="button" onClick={onOpenModal}>
      Create
    </Button>
    <Button type="button" onClick={clearSelectedIds}>
      Cancel
    </Button>
  </span>
);

export default GroupPostInfoAlert;
