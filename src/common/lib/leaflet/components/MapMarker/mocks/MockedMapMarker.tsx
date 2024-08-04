const MockedMapMarker = jest.fn(
  ({ color, position, isNew, isMarked, children }) => {
    return (
      <div>
        {color} - {position?.[0]} - {position?.[1]} -{' '}
        {isNew ? 'new' : 'existing'} - {isMarked ? 'marked' : 'not marked'} -{' '}
        {children}
      </div>
    );
  }
);

export default MockedMapMarker;
