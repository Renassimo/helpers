const MockedPageTemplate = jest.fn(({ title, user, pages, children }) => (
  <div>
    Mocked Page Template ({title}):
    <span>
      {user?.name} - {pages[0]?.title}
    </span>
    {children}
  </div>
));

export default MockedPageTemplate;
