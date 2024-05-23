const MockedAnswerCard = jest.fn(({ children }) => (
  <div>
    Mocked Answer Card:
    {children}
  </div>
));

export default MockedAnswerCard;
