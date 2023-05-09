import React from 'react';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import PlanesContainer from '@/components/spotting/PlanesContainer';
import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';
import GroupPlanesModal from '@/components/spotting/GroupPlanesModal';

const SpottedPlanesList = () => {
  const { spottedPlanes } = useSpottedPlanes();

  return (
    <PlanesContainer>
      {spottedPlanes.map((item) => (
        <SpottedPlaneCard data={item} key={item.id} selectable />
      ))}
      <GroupPlanesModal />
    </PlanesContainer>
  );
};

export default SpottedPlanesList;
