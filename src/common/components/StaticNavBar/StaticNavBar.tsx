import { useState, MouseEvent, useCallback, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import { PageInfo } from '@/auth/types';

import NavBarMenu from '@/common/components/NavBar/components/NavBarMenu';
import MenuIcon from '@mui/icons-material/Menu';

const StaticNavBar = ({
  pages = [],
  children,
}: {
  pages?: PageInfo[];
  children?: ReactNode;
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setMenuAnchor(event.currentTarget);
    },
    [setMenuAnchor]
  );
  const handleCloseMenu = useCallback(() => {
    setMenuAnchor(null);
  }, [setMenuAnchor]);

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar
        variant="dense"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box />
        {children && <Box>{children}</Box>}
        <Box>
          {pages.length > 0 && (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenMenu}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <NavBarMenu
                anchor={menuAnchor}
                onClose={handleCloseMenu}
                pages={pages}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StaticNavBar;
