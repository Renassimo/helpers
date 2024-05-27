import { PageInfo } from '@/common/types/auth';

const MockedPagesList = jest.fn(({ pages }: { pages: PageInfo[] }) => {
  return (
    <div>
      {pages.map((page) => (
        <a href={page.path} key={page.title}>
          {page.title}
        </a>
      ))}
    </div>
  );
});

export default MockedPagesList;
