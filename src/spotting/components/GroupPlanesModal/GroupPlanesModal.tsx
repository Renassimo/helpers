import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';
import useApplySpottedPlanes from '@/hooks/spotting/useApplySpottedPlanes';
import useAlerts from '@/hooks/alerts';

import Modal from '@/common/components/Modal';
import SpottedPlaneCard from '@/spotting/components/SpottedPlaneCard';
import GroupPlanesForm from '@/spotting/components/GroupPlanesForm';
import PlanesContainer from '@/spotting/components/PlanesContainer';
import GroupPostInfoAlert from '@/spotting/components/GroupPostInfoAlert';

const GroupPlanesModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
    clearAll();

    const selectedCount = selectedIds.length;

    if (selectedCount > 1)
      createInfoAlert(
        <GroupPostInfoAlert
          selectedCount={selectedCount}
          onOpenModal={onOpenModal}
          clearSelectedIds={clearSelectedIds}
        />,
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
        disabled={!groupName}
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
