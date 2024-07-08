const MockedGameForm = jest.fn(({ values }) => (
  <div>
    MockedGameForm - {values?.title} - {values?.description} -{' '}
    {values?.backgroundColor} - {values?.mapImageUrl}
  </div>
));

export default MockedGameForm;
