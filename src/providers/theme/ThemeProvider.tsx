import { ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ThemeProvider as MUIThemeProvider, Theme } from '@mui/material/styles';

const ThemeProvider = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: Theme;
}) => (
  <EmotionThemeProvider theme={theme}>
    <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
  </EmotionThemeProvider>
);

export default ThemeProvider;
