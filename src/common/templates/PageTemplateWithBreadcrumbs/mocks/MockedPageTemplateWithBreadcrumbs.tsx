const MockedPageTemplateWithBreadcrumbs = jest.fn(
  ({ title, user, pages, description, children }) => (
    <div>
      MockedPageTemplateWithBreadcrumbs ({title}):
      <span>
        {user?.name} - {pages[0]?.title} - {description}
      </span>
      {children}
    </div>
  )
);

export default MockedPageTemplateWithBreadcrumbs;
