const MockedDayLink = jest.fn(({ prev, next }) => (
  <div>
    Mocked Day Link: Prev: {prev}
    Next: {next}
  </div>
));

export default MockedDayLink;
