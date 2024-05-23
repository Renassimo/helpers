import styled from '@emotion/styled';
import { css } from '@emotion/react';

const PlanesContainer = styled.div(
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

export default PlanesContainer;
