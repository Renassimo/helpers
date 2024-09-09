const MockedMyFlightFormModal = jest.fn(({ isModalOpen }) => (
  <div>MockedMyFlightFormModal {isModalOpen ? 'opened' : 'closed'}</div>
));

export default MockedMyFlightFormModal;
