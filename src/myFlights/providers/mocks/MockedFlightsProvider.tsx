const MockedFlightsProvider = jest.fn(({ children }) => (
  <div>MockedFlightsProvider - {children}</div>
));

export default MockedFlightsProvider;
