import Link from 'next/link';

import Typography from '@mui/material/Typography';
import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import MUILink from '@mui/material/Link';

import { BreadcrumbsItem } from '@/common/types/props';
import { MouseEvent } from 'react';

const Breadcrumbs = ({ data }: { data?: BreadcrumbsItem[] }) => {
  return data ? (
    <MUIBreadcrumbs>
      {data.map((link) => {
        const { action } = link;
        const onClick = (event: MouseEvent) => {
          if (action) {
            event.preventDefault();
            action?.();
          }
        };
        return link.current ? (
          <Typography key={link.title} component="span">
            {link.title}
          </Typography>
        ) : (
          <Link key={link.title} href={link.href}>
            <MUILink underline="hover" component="span" onClick={onClick}>
              {link.title}
            </MUILink>
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  ) : null;
};

export default Breadcrumbs;
