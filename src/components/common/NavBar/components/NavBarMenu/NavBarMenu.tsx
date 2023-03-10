import Link from 'next/link';

import { PageInfo } from '@/types/auth';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const NavBarMenu = ({
  anchor,
  onClose,
  pages,
  signOut,
}: {
  anchor: HTMLElement | null;
  onClose: () => void;
  pages: PageInfo[];
  signOut: () => void;
}) => {
  return (
    <Menu id="menu-appbar" anchorEl={anchor} onClose={onClose} open={!!anchor}>
      <MenuItem>
        <Link href="/">
          <Typography textAlign="center">Main</Typography>
        </Link>
      </MenuItem>
      <Divider variant="middle" />
      {pages.map(({ title, path }) => (
        <MenuItem key={title}>
          <Link href={path}>
            <Typography textAlign="center">{title}</Typography>
          </Link>
        </MenuItem>
      ))}
      <Divider variant="middle" />
      <MenuItem key="sign-out" onClick={signOut}>
        <Typography textAlign="center">Sign Out</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NavBarMenu;
