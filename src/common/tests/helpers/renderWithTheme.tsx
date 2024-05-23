import React, { ReactNode } from 'react';
import ThemeProvider from '@/common/providers/theme';
import theme from '@/common/styles/themes/main';
import { render } from '@testing-library/react';

export default function renderWithTheme(component: ReactNode) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}
