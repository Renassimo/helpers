import React, { useState } from 'react';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import PlanesContainer from '@/components/spotting/PlanesContainer';
import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';
import GroupPlanesModal from '@/components/spotting/GroupPlanesModal';

const SpottedPlanesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { spottedPlanes } = useSpottedPlanes();

  return (
    <PlanesContainer>
      {spottedPlanes.map((item) => (
        <SpottedPlaneCard data={item} key={item.id} selectable />
      ))}
      <GroupPlanesModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PlanesContainer>
  );
};

export default SpottedPlanesList;
