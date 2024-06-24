const MockedGameMapsTemplate = jest.fn(
  ({ title, user, pages, description, children }) => (
    <div>
      Mocked Game Maps Template ({title}):
      <span>
        {user?.name} - {pages[0]?.title} - {description}
      </span>
      {children}
    </div>
  )
);

export default MockedGameMapsTemplate;
