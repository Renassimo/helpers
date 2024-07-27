const MockedMapOnImage = jest.fn(
  ({ onClick, mapImageUrl, backgroundColor, children }) => (
    <div>
      MockedMapOnImage {onClick && 'withOnClick'} {mapImageUrl}{' '}
      {backgroundColor} - {children}
    </div>
  )
);

export default MockedMapOnImage;
