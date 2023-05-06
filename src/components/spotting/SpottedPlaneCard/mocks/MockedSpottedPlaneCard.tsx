const MockedSpottedPlaneCard = jest.fn(
  ({ data, selectable }: { data: any; selectable?: any }) => {
    const { id, name, photoUrl, planespottersUrl, description, hashtags } =
      data;
    return (
      <div>
        Mocked Spotted Plane Card:{' '}
        {selectable ? 'selectable' : 'not selectable'}, id: {id}, name:
        {name}, photoUrl; {photoUrl}, planespottersUrl: {planespottersUrl},
        description: {description}, hashtags: {hashtags}
      </div>
    );
  }
);

export default MockedSpottedPlaneCard;
