const MockedPlayCard = jest.fn(
  ({ title, description, href, createdAt, updatedAt, onClick }) => (
    <div>
      Mocked Play Card ({title}):
      {description} - {href} - {onClick ?? 'with click'} - {createdAt} -{' '}
      {updatedAt}
    </div>
  )
);

export default MockedPlayCard;
