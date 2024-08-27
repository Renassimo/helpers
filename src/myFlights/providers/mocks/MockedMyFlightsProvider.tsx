const MyFlightsProvider = jest.fn(({ children }) => (
  <div>MyFlightsProvider - {children}</div>
));

export default MyFlightsProvider;
