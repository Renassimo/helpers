const MockedPlayProvider = jest.fn(({ children }) => (
  <div>MockedPlayProvider - {children}</div>
));

export default MockedPlayProvider;
