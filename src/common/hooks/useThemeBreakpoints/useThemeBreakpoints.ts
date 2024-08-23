import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const useThemeBreakpoints = () => {
  const theme = useTheme();

  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const downXl = useMediaQuery(theme.breakpoints.down('xl'));

  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));
  const upXl = useMediaQuery(theme.breakpoints.up('xl'));

  return {
    down: {
      sm: downSm,
      md: downMd,
      lg: downLg,
      xl: downXl,
    },
    up: {
      sm: upSm,
      md: upMd,
      lg: upLg,
      xl: upXl,
    },
  };
};

export default useThemeBreakpoints;
