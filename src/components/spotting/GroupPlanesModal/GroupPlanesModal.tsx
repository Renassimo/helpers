import React, { useCallback, useEffect, useState } from 'react';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';
import useApplySpottedPlanes from '@/hooks/spotting/useApplySpottedPlanes';
import useAlerts from '@/hooks/alerts';

import Button from '@mui/material/Button';

import Modal from '@/components/common/Modal';
import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';
import GroupPlanesForm from '@/components/spotting/GroupPlanesForm';
import PlanesContainer from '@/components/spotting/PlanesContainer';

const GroupPlanesModal = () => {
  const {
    spottedPlanes,
    selectedIds,
    generateGroupDescriptionAndHashtags,
    clearGroupData,
    clearSelectedIds,
    groupName,
    groupDescription,
    groupHashtags,
  } = useSpottedPlanes();
  const { update, loading } = useApplySpottedPlanes();
  const { createInfoAlert, clearAll } = useAlerts();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    clearGroupData();
  }, [clearGroupData, setIsModalOpen]);

  const onOpenModal = useCallback(() => {
    generateGroupDescriptionAndHashtags();
    setIsModalOpen(true);
  }, [generateGroupDescriptionAndHashtags, setIsModalOpen]);

  const onSubmitModal = async () => {
    const data = spottedPlanes
      .filter((spottedPlane) => selectedIds.includes(spottedPlane.id))
      .map((spottedPlane) => ({
        ...spottedPlane,
        groupName,
        groupDescription,
        groupHashtags,
      }));
    await update(data);
    clearSelectedIds();
    onCloseModal();
  };

  useEffect(() => {
    const selectedCount = selectedIds.length;
    clearAll();
    if (selectedCount > 1)
      createInfoAlert(
        <span>
          Create group post from {selectedCount} planes?{' '}
          <Button type="button" onClick={onOpenModal}>
            Create
          </Button>
          <Button type="button" onClick={clearSelectedIds}>
            Cancel
          </Button>
        </span>,
        0
      );
  }, [clearAll, createInfoAlert, onOpenModal, selectedIds, clearSelectedIds]);

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={onCloseModal}
        onSubmit={onSubmitModal}
        title="Create group post"
        loading={loading}
        maxWidth={'xl'}
      >
        <GroupPlanesForm />
        <PlanesContainer>
          {spottedPlanes
            .filter((item) => selectedIds.includes(item.id))
            .map((item) => (
              <SpottedPlaneCard data={item} key={item.id} />
            ))}
        </PlanesContainer>
      </Modal>
    </>
  );
};

export default GroupPlanesModal;
