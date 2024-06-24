import { BreadcrumbsItem } from '@/common/types/props';

const MockedBreadcrumbs = jest.fn(({ data }: { data: BreadcrumbsItem[] }) => {
  return (
    <div>
      {data.map((item) => (
        <a href={item.href} key={item.title}>
          {item.title} - {item.current ?? 'Current'}
        </a>
      ))}
    </div>
  );
});

export default MockedBreadcrumbs;
