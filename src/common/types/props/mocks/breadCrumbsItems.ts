import { BreadcrumbsItem } from '../propsTypes';

export const mockedBreadCrumbItem1: BreadcrumbsItem = {
  title: 'Breadcrumb 1',
  href: '/breadcrumb1',
};

export const mockedBreadCrumbItem2: BreadcrumbsItem = {
  title: 'Breadcrumb 2',
  href: '/breadcrumb2',
  current: true,
};

export const mockedBreadCrumbItems: BreadcrumbsItem[] = [
  mockedBreadCrumbItem1,
  mockedBreadCrumbItem2,
];
