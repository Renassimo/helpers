import Link from 'next/link';

import { PageInfo } from '@/types/auth';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const NavBarMenu = ({
  anchor,
  onClose,
  pages,
  signOut,
  withMain = false,
}: {
  anchor: HTMLElement | null;
  onClose: () => void;
  pages: PageInfo[];
  signOut: () => void;
  withMain?: boolean;
}) => {
  return (
    <Menu id="menu-appbar" anchorEl={anchor} onClose={onClose} open={!!anchor}>
      {withMain && (
        <Box>
          <MenuItem>
            <Link href="/">
              <Typography textAlign="center">Main</Typography>
            </Link>
          </MenuItem>
          <Divider variant="middle" />
        </Box>
      )}
      {pages.length > 0 && (
        <Box>
          {pages.map(({ title, path }) => (
            <MenuItem key={title}>
              <Link href={path}>
                <Typography textAlign="center">{title}</Typography>
              </Link>
            </MenuItem>
          ))}
          <Divider variant="middle" />
        </Box>
      )}
      <MenuItem key="sign-out" onClick={signOut}>
        <Typography textAlign="center">Sign Out</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NavBarMenu;
