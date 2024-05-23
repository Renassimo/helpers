import React, { useState } from 'react';

import useSpottedPlanes from '@/spotting/hooks/useSpottedPlanes';

import PlanesContainer from '@/spotting/components/PlanesContainer';
import SpottedPlaneCard from '@/spotting/components/SpottedPlaneCard';
import GroupPlanesModal from '@/spotting/components/GroupPlanesModal';

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
