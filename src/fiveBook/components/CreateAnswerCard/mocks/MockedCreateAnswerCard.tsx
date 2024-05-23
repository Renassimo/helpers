const MockedCreateAnswerCard = jest.fn(({ children }) => (
  <div>
    Mocked Create Answer Card:
    {children}
  </div>
));

export default MockedCreateAnswerCard;
