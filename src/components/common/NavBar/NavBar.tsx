import { useState, MouseEvent } from 'react';
import Link from 'next/link'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { PageInfo, User } from '@/types/auth';

import useAuth from '@/hooks/useAuth';

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
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };
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
          <Menu
            id="menu-appbar"
            anchorEl={menuAnchor}
            onClose={handleCloseMenu}
            open={!!menuAnchor}
          >
            {pages.map(({ title, path }) => (
              <MenuItem key={title}>
                <Link href={path}>
                  <Typography textAlign="center">{title}</Typography>
                </Link>
              </MenuItem>
            ))}
            <MenuItem key="sign-out" onClick={signOut}>
              <Typography textAlign="center">Sign Out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
