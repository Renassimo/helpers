import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';
import { FileWithPreview } from '@/common/types/files';

export interface PageProps<T> {
  user: User;
  pages: PageInfo[];
  data: T | null;
  error: CommonError | null;
}

export interface ServerSideProps<T> {
  props: T;
}

export interface Data<A> {
  id: string;
  attributes: A;
}

export interface BreadcrumbsItem {
  href: string;
  title: string;
  current?: boolean;
  action?: () => void;
}

export interface ImagePickerProps {
  defaultUrlValue?: string;
  onChange: (value: null | FileWithPreview) => void;
}
