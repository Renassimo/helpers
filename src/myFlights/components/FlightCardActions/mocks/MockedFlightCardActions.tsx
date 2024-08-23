const MockedFlightCardActions = jest.fn(({ data }) => (
  <div>MockedFlightCardActions - {data?.id}</div>
));

export default MockedFlightCardActions;
