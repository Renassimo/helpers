import renderWithTheme from '@/common/tests/helpers';

import BaseAircraftForm from '@/avia/components/BaseAircraftForm';
import BaseAirportForm from '@/avia/components/BaseAirportForm';
import PhotoFolderInfoForm from '../../PhotoFolderInfoForm';
import FlownResult from '../../FlownResult';

import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';

import usePhotoFolderInfoForm from '../hooks/usePhotoFolderInfoForm';

import MockedBaseAircraftForm from '@/avia/components/BaseAircraftForm/mocks';
import MockedBaseAirportForm from '@/avia/components/BaseAirportForm/mocks';
import MockedPhotoFolderInfoForm from '../../PhotoFolderInfoForm/mocks';
import MockedFlownResult from '../../FlownResult/mocks';

import PhotoFolderForm from '../PhotoFolderForm';

jest.mock('@/avia/components/BaseAircraftForm');
jest.mock('@/avia/components/BaseAirportForm');
jest.mock('../../PhotoFolderInfoForm');
jest.mock('@/avia/hooks/useAircrafts');
jest.mock('@/avia/hooks/useAirports');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock('@/spotting/providers/hooks/usePhotoInfoProvider/useLoadedValues');
jest.mock('../hooks/usePhotoFolderInfoForm');
jest.mock('../../FlownResult');

describe('PhotoFolderForm', () => {
  const setFlown = jest.fn();
  const placeCommon = 'placeCommon';

  beforeEach(() => {
    (BaseAircraftForm as unknown as jest.Mock).mockImplementation(
      MockedBaseAircraftForm
    );
    (BaseAirportForm as unknown as jest.Mock).mockImplementation(
      MockedBaseAirportForm
    );
    (PhotoFolderInfoForm as unknown as jest.Mock).mockImplementation(
      MockedPhotoFolderInfoForm
    );
    (FlownResult as unknown as jest.Mock).mockImplementation(MockedFlownResult);
    (useAircrafts as unknown as jest.Mock).mockImplementation(
      jest.fn(() => 'mockedUseAircraft')
    );
    (useAirports as unknown as jest.Mock).mockImplementation(
      jest.fn(() => 'mockedUseAirports')
    );
    (usePhotoFolderInfoForm as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({
        loadedValues: 'loadedValues',
        setFlown,
        placeCommon: null,
      }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PhotoFolderForm />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(usePhotoFolderInfoForm).toBeCalledWith({
      aircraftsResult: 'mockedUseAircraft',
      airportsResult: 'mockedUseAirports',
    });
    expect(BaseAircraftForm).toBeCalledWith(
      {
        aircraftsResult: 'mockedUseAircraft',
        useOwnDb: true,
      },
      {}
    );
    expect(BaseAirportForm).toBeCalledWith(
      {
        airportsResult: 'mockedUseAirports',
        title: 'Airport',
      },
      {}
    );
    expect(PhotoFolderInfoForm).toBeCalledWith(
      { loadedValues: 'loadedValues' },
      {}
    );
    expect(FlownResult).toBeCalledWith(
      { aircraftsResult: 'mockedUseAircraft', onClick: setFlown },
      {}
    );
  });

  describe('when placeCommon returned', () => {
    beforeEach(() => {
      (usePhotoFolderInfoForm as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          loadedValues: 'loadedValues',
          setFlown,
          placeCommon,
        }))
      );
    });

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<PhotoFolderForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(usePhotoFolderInfoForm).toBeCalledWith({
        aircraftsResult: 'mockedUseAircraft',
        airportsResult: 'mockedUseAirports',
      });
      expect(BaseAircraftForm).toBeCalledWith(
        { aircraftsResult: 'mockedUseAircraft', useOwnDb: true },
        {}
      );
      expect(BaseAirportForm).not.toBeCalled();
      expect(PhotoFolderInfoForm).toBeCalledWith(
        { loadedValues: 'loadedValues' },
        {}
      );
      expect(FlownResult).toBeCalledWith(
        { aircraftsResult: 'mockedUseAircraft', onClick: setFlown },
        {}
      );
    });
  });
});
