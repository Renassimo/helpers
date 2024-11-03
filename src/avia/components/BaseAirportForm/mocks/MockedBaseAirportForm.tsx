const MockedBaseAirportForm = jest.fn(({ title, adornments }) => (
  <div>
    MockedBaseAirportForm - {title} - {adornments}
  </div>
));

export default MockedBaseAirportForm;
