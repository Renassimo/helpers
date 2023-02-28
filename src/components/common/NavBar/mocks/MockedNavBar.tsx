const MockedNavBar = jest.fn(({ serverSideUser, pages }) => (
  <div>
    Mocked Nav Bar:
    <span>
      {serverSideUser.name} - {pages[0].title}
    </span>
  </div>
));

export default MockedNavBar;
