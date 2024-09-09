const MockedFlightCard = jest.fn(({ chosen }) => (
  <div>MockedFlightCard - {chosen && 'chosen'}</div>
));

export default MockedFlightCard;
