const MockedMapMarker = jest.fn(({ color, position, isNew, children }) => {
  return (
    <div>
      {color} - {position?.[0]} - {position?.[1]} - {isNew ? 'new' : 'existing'}{' '}
      - {children}
    </div>
  );
});

export default MockedMapMarker;
