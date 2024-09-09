const MockedActiveCard = jest.fn(
  ({ chosen, imageUrl, imageAlt, link, children }) => (
    <div>
      MockedActiveCard - {chosen && 'chosen'} - {imageUrl} - {imageAlt} - {link}{' '}
      - {children}
    </div>
  )
);

export default MockedActiveCard;
