import { useState, MouseEvent, useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import { PageInfo, User } from '@/types/auth';

import useAuth from '@/hooks/useAuth';

import NavBarMenu from '@/components/common/NavBar/components/NavBarMenu';

const NavBar = ({
  serverSideUser,
  pages,
}: {
  serverSideUser: User;
  pages: PageInfo[];
}) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const { user, signOut } = useAuth(serverSideUser);
  const { name, picture } = user ?? {};

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
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenMenu}>
              <Avatar alt={name} src={picture} />
            </IconButton>
          </Tooltip>
          <NavBarMenu
            anchor={menuAnchor}
            onClose={handleCloseMenu}
            pages={pages}
            signOut={signOut}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
