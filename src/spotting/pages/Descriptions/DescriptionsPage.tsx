import { useEffect } from 'react';

import { PageInfo, User } from '@/auth/types';
import { NotionError } from '@/common/types/notion';
import { SpottedPlaneApiData } from '@/spotting/types';

import SpottingProvider from '@/spotting/providers/SpottingProvider';

import useAlerts from '@/common/hooks/alerts';

import PageTemplateWithBreadcrumbs from '@/common/templates/PageTemplateWithBreadcrumbs';
import SpottedPlanesList from '@/spotting/components/SpottedPlanesList';
import { BreadcrumbsItem } from '@/common/types/props';

const DescriptionsPage = ({
  user,
  pages,
  data,
  error,
}: {
  user: User;
  pages: PageInfo[];
  data: SpottedPlaneApiData[] | null;
  error: NotionError | null;
}) => {
  const { createErrorAlert } = useAlerts();

  useEffect(() => {
    if (error) createErrorAlert(error.message || error.code || error.status);
  }, [createErrorAlert, error]);

  const breadcrumbs: BreadcrumbsItem[] = [
    { title: 'Spotting', href: '/spotting' },
  ];

  return (
    <SpottingProvider data={data}>
      <PageTemplateWithBreadcrumbs
        title="Spotting"
        user={user}
        pages={pages}
        breadcrumbs={breadcrumbs}
      >
        <SpottedPlanesList />
      </PageTemplateWithBreadcrumbs>
    </SpottingProvider>
  );
};

export default DescriptionsPage;
