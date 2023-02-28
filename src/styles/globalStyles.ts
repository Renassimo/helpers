import { css } from '@emotion/react';
import { Roboto } from '@/styles/fontStyles';

const styles = css`
  ${Roboto}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  html,
  body {
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default styles;
