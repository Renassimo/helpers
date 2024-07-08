import { Dispatch } from 'react';
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
}

export interface ImagePickerProps {
  imageUrl?: string;
  imageFile: null | FileWithPreview;
  setImageFile: Dispatch<React.SetStateAction<null | FileWithPreview>>;
}
