import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import useSpottedPlanes from '@/hooks/spotting/useSpottedPlanes';

import SpottedPlaneCard from '@/components/spotting/SpottedPlaneCard';

const Wrapper = styled.div(
  ({ theme }) => css`
    padding: ${theme.spacing(4)} 0;
    display: grid;
    grid-gap: ${theme.spacing(2)};
    grid-template-columns: 1fr 1fr 1fr 1fr;

    ${theme.breakpoints.down('lg')} {
      grid-template-columns: 1fr 1fr 1fr;
    }

    ${theme.breakpoints.down('md')} {
      grid-template-columns: 1fr 1fr;
    }

    ${theme.breakpoints.down('sm')} {
      grid-template-columns: 1fr;
    }
  `
);

const SpottedPlanesList = () => {
  const { spottedPlanes } = useSpottedPlanes();
  return (
    <Wrapper>
      {spottedPlanes.map((item) => (
        <SpottedPlaneCard data={item} key={item.id} selectable />
      ))}
    </Wrapper>
  );
};

export default SpottedPlanesList;
