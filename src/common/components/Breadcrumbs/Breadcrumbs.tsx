import Link from 'next/link';

import Typography from '@mui/material/Typography';
import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import MUILink from '@mui/material/Link';

import { BreadcrumbsItem } from '@/common/types/props';

const Breadcrumbs = ({ data }: { data?: BreadcrumbsItem[] }) => {
  return data ? (
    <MUIBreadcrumbs>
      {data.map((link) =>
        link.current ? (
          <Typography key={link.title} component="span">
            {link.title}
          </Typography>
        ) : (
          <Link key={link.title} href={link.href}>
            <MUILink underline="hover" component="span">
              {link.title}
            </MUILink>
          </Link>
        )
      )}
    </MUIBreadcrumbs>
  ) : null;
};

export default Breadcrumbs;
