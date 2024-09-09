const MockedAircraftCard = jest.fn(({ chosen }) => (
  <div>MockedAircraftCard - {chosen && 'chosen'}</div>
));

export default MockedAircraftCard;
