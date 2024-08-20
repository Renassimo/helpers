const MockedMapMarker = jest.fn(
  ({ color, position, isNew, isMarked, children, title }) => {
    return (
      <div>
        {color} - {position?.[0]} - {position?.[1]} -{' '}
        {isNew ? 'new' : 'existing'} - {isMarked ? 'marked' : 'not marked'} -{' '}
        {children} - {title}
      </div>
    );
  }
);

export default MockedMapMarker;
