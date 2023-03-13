import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Paper from '@mui/material/Paper';

const Wrapper = styled.div(
  ({ theme }) => css`
    padding: ${theme.spacing(2)};
    height: 85vh;
    overflow: auto;

    ${theme.breakpoints.down('md')} {
      height: auto;
      max-height: none;
    }
  `
);

const FiveBookCard = ({ children }: { children: ReactNode }) => (
  <Paper>
    <Wrapper>{children}</Wrapper>
  </Paper>
);

export default FiveBookCard;
