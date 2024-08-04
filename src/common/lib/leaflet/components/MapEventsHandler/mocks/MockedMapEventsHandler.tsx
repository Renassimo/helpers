const MockedMapEventsHandler = jest.fn(({ handleMapClick }) => (
  <div>MockedMapEventsHandler {handleMapClick && 'withHandleMapClick'}</div>
));

export default MockedMapEventsHandler;
