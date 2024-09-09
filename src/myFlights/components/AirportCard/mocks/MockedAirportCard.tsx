const MockedAirportCard = jest.fn(({ title, chosen }) => (
  <div>
    MockedAirportCard - {title} - {chosen && 'chosen'}
  </div>
));

export default MockedAirportCard;
