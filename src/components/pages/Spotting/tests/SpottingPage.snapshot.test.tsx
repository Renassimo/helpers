import renderWithTheme from '@/tests/helpers';

import { NotionError } from '@/types/notion';

import SpottingPage from '@/components/pages/Spotting';
import SpottedPlanesList from '@/components/spotting/SpottedPlanesList';

import MockedSpottedPlanesList from '@/components/spotting/SpottedPlanesList/mocks';

jest.mock('@/components/spotting/SpottedPlanesList');

describe('SpottingPage', () => {
  const user = {
    email: 'email@example.com',
    name: 'Name',
    picture: 'https://pic.com',
    uid: 'uid',
  };
  const pages = [
    {
      title: 'title',
      path: 'path',
    },
  ];
  const data = [
    {
      id: 'id',
      attributes: {
        airplaneName: 'Airplane name 1',
        cn: '1000',
        carrier: 'Carrier 1',
        firstFlight: '2011-01-01',
        flown: false,
        groupPost: false,
        manufacturer: 'Manufacturer 1',
        model: 'model 1',
        modelled: false,
        name: 'Name 1',
        photosUrl: 'photosUrl1',
        place: 'Place 1',
        planespottersUrl: 'planespottersUrl',
        registration: 'registration 1',
        spottedDate: '2021-01-01',
        url: 'url1',
        photoUrl: 'photoUrl1',
      },
    },
  ];
  const error: NotionError = {
    code: 'i_am_teapot',
    message: 'I am Teapot',
    object: 'error',
    status: 418,
  };

  beforeEach(() => {
    (SpottedPlanesList as unknown as jest.Mock).mockImplementationOnce(
      MockedSpottedPlanesList
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when got data', () => {
    test('renders successfully', () => {
      // Arrange
      // Act
      const { container } = renderWithTheme(
        <SpottingPage user={user} pages={pages} data={data} error={null} />
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedSpottedPlanesList).toHaveBeenCalledWith({}, {});
    });
  });

  describe('when got error', () => {
    test('renders successfully', () => {
      // Arrange
      // Act
      const { container } = renderWithTheme(
        <SpottingPage user={user} pages={pages} data={null} error={error} />
      );
      // Assert
      expect(container).toMatchSnapshot();
      expect(MockedSpottedPlanesList).toHaveBeenCalledWith({}, {});
    });
  });
});
