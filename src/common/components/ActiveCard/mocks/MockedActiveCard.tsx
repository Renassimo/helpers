const MockedActiveCard = jest.fn(({ chosen, imageUrl, imageAlt }) => (
  <div>
    MockedActiveCard - {chosen && 'chosen'} - {imageUrl} - {imageAlt}
  </div>
));

export default MockedActiveCard;
