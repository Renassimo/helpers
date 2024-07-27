const MockedSaveMarkerPopupContent = jest.fn(({ text, onAdd, onCancel }) => (
  <div>
    MockedSaveMarkerPopupContent - {text} - {onAdd && 'withOnAdd'} -{' '}
    {onCancel && 'withOnCancel'}
  </div>
));

export default MockedSaveMarkerPopupContent;
