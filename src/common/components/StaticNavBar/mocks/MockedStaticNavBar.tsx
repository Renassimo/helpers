const MockedStaticNavBar = jest.fn(({ pages }) => (
  <div>
    Mocked Static Nav Bar:
    <span>{pages?.[0]?.title}</span>
  </div>
));

export default MockedStaticNavBar;
