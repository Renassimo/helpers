const MockedMapOnImage = jest.fn(
  ({ onClick, mapImageUrl, backgroundColor, mapImageRatio, children }) => (
    <div>
      MockedMapOnImage {onClick && 'withOnClick'} {mapImageUrl}{' '}
      {backgroundColor} - {children} - {mapImageRatio}
    </div>
  )
);

export default MockedMapOnImage;
