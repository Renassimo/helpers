import { NotionError } from '@/types/notion';

export const mockedNotionError418: NotionError = {
  code: 'i_am_teapot',
  message: 'I am Teapot',
  object: 'error',
  status: 418,
};
