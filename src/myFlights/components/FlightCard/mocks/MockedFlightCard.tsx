const MockedFlightCard = jest.fn(({ data }) => (
  <div>MockedFlightCard - {data?.id}</div>
));

export default MockedFlightCard;
