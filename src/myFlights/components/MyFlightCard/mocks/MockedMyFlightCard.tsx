const MockedMyFlightCard = jest.fn(({ data }) => (
  <div>MockedMyFlightCard - {data?.id}</div>
));

export default MockedMyFlightCard;
