import { SpottedPlaneProviderData } from '@/spotting/types';

const MockedSpottedPlaneForm = jest.fn(
  ({ data }: { data: SpottedPlaneProviderData }) => {
    const { id, description, hashtags } = data;
    return (
      <div>
        id: {id}, description: {description}, hashtags: {hashtags}
      </div>
    );
  }
);

export default MockedSpottedPlaneForm;
