const MockedPlayCard = jest.fn(
  ({ title, description, href, startDate, lastUpdateDate, onClick }) => (
    <div>
      Mocked Play Card ({title}):
      {description} - {href} - {onClick ?? 'with click'} - {startDate} -{' '}
      {lastUpdateDate}
    </div>
  )
);

export default MockedPlayCard;
