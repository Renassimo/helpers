import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Breadcrumbs from '@/common/components/Breadcrumbs';
import PageTemplate from '@/common/templates/PageTemplate';

import { PageInfo, User } from '@/auth/types';
import { BreadcrumbsItem } from '@/common/types/props';

const PageTemplateWithBreadcrumbs = ({
  children,
  title,
  description,
  breadcrumbs,
  user,
  pages = [],
}: {
  children: ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbsItem[];
  user?: User | null;
  pages?: PageInfo[];
}) => {
  return (
    <PageTemplate title={title} user={user} pages={pages}>
      {description && (
        <Typography component="h1" variant="h5" textAlign="center" mt={5}>
          {description}
        </Typography>
      )}
      {breadcrumbs?.length && (
        <Box my={2}>
          <Breadcrumbs data={breadcrumbs} />
        </Box>
      )}
      {children}
    </PageTemplate>
  );
};

export default PageTemplateWithBreadcrumbs;
