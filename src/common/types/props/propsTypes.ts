import { PageInfo, User } from '@/auth/types';
import { CommonError } from '@/common/types/errors';

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
