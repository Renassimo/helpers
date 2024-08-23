import { cleanup, renderHook } from '@testing-library/react';

import useMediaQuery from '@mui/material/useMediaQuery';

import useThemeBreakpoints from '../useThemeBreakpoints';

jest.mock('@mui/material/useMediaQuery');

describe('useThemeBreakpoints', () => {
  const returnResult = (bp: string) => {
    if (bp === '@media (max-width:599.95px)') return 'downSm';
    if (bp === '@media (max-width:899.95px)') return 'downMd';
    if (bp === '@media (max-width:1199.95px)') return 'downLg';
    if (bp === '@media (max-width:1535.95px)') return 'downXl';
    if (bp === '@media (min-width:600px)') return 'upSm';
    if (bp === '@media (min-width:900px)') return 'upMd';
    if (bp === '@media (min-width:1200px)') return 'upLg';
    if (bp === '@media (min-width:1536px)') return 'upXl';
    return '';
  };

  const mockedUseMediaQuery = jest.fn(returnResult);

  beforeEach(() => {
    (useMediaQuery as unknown as jest.Mock).mockImplementation(
      mockedUseMediaQuery
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('returns breakpoints state', () => {
    // Arange
    // Act
    const { result } = renderHook(() => useThemeBreakpoints());
    // Assert
    expect(result.current).toEqual({
      down: {
        sm: 'downSm',
        md: 'downMd',
        lg: 'downLg',
        xl: 'downXl',
      },
      up: {
        sm: 'upSm',
        md: 'upMd',
        lg: 'upLg',
        xl: 'upXl',
      },
    });
    expect(useMediaQuery).toBeCalledTimes(8);
    expect(useMediaQuery).nthCalledWith(1, '@media (max-width:599.95px)');
    expect(useMediaQuery).nthCalledWith(2, '@media (max-width:899.95px)');
    expect(useMediaQuery).nthCalledWith(3, '@media (max-width:1199.95px)');
    expect(useMediaQuery).nthCalledWith(4, '@media (max-width:1535.95px)');
    expect(useMediaQuery).nthCalledWith(5, '@media (min-width:600px)');
    expect(useMediaQuery).nthCalledWith(6, '@media (min-width:900px)');
    expect(useMediaQuery).nthCalledWith(7, '@media (min-width:1200px)');
    expect(useMediaQuery).nthCalledWith(8, '@media (min-width:1536px)');
  });
});
