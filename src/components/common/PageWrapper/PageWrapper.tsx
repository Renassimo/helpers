import styled from '@emotion/styled';
import { css } from '@emotion/react';

const PageWrapper = styled.main(
  ({ theme }) => css`
    min-height: 100vh;
    background: linear-gradient(
      0deg,
      rgba(255, 254, 252, 1) 0%,
      rgba(223, 232, 255, 1) 100%
    );
    display: grid;
    grid-template-rows: ${theme.mixins.toolbar.minHeight}px 1fr;

    ${theme.breakpoints.down('md')} {
      grid-template-rows: calc(100vh - ${theme.mixins.toolbar.minHeight}px) ${theme
          .mixins.toolbar.minHeight}px;
    }
  `
);

export default PageWrapper;
