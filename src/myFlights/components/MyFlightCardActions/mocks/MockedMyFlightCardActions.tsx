const MockedMyFlightCardActions = jest.fn(({ data }) => (
  <div>MockedMyFlightCardActions - {data?.id}</div>
));

export default MockedMyFlightCardActions;
