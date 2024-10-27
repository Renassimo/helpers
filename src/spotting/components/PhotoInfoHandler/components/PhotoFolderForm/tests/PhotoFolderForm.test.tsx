import renderWithTheme from '@/common/tests/helpers';

import BaseAircraftForm from '@/avia/components/BaseAircraftForm';
import BaseAirportForm from '@/avia/components/BaseAirportForm';
import PhotoFolderInfoForm from '../../PhotoFolderInfoForm';

import useAircrafts from '@/avia/hooks/useAircrafts';
import useAirports from '@/avia/hooks/useAirports';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';
import useLoadedValues from '@/spotting/providers/hooks/usePhotoInfoProvider/useLoadedValues';

import MockedBaseAircraftForm from '@/avia/components/BaseAircraftForm/mocks';
import MockedBaseAirportForm from '@/avia/components/BaseAirportForm/mocks';
import MockedPhotoFolderInfoForm from '../../PhotoFolderInfoForm/mocks';

import PhotoFolderForm from '../PhotoFolderForm';
import { mockedPhotoFolder } from '@/spotting/types/mocks';

jest.mock('@/avia/components/BaseAircraftForm');
jest.mock('@/avia/components/BaseAirportForm');
jest.mock('../../PhotoFolderInfoForm');
jest.mock('@/avia/hooks/useAircrafts');
jest.mock('@/avia/hooks/useAirports');
jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock('@/spotting/providers/hooks/usePhotoInfoProvider/useLoadedValues');

describe('PhotoFolderForm', () => {
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
    (useAircrafts as unknown as jest.Mock).mockImplementation(
      jest.fn(() => 'mockedUseAircraft')
    );
    (useAirports as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ chosenAirport: { attributes: { airportCode: null } } }))
    );
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ place: null, showingFolder: null }))
    );
    (useLoadedValues as unknown as jest.Mock).mockImplementation(
      jest.fn(() => ({ loadedValues: 'loadedValues' }))
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
    expect(useLoadedValues).toBeCalledWith({
      aircraftsResult: 'mockedUseAircraft',
      place: null,
      date: null,
    });
    expect(BaseAircraftForm).toBeCalledWith(
      { aircraftsResult: 'mockedUseAircraft' },
      {}
    );
    expect(BaseAirportForm).toBeCalledWith(
      {
        airportsResult: {
          chosenAirport: { attributes: { airportCode: null } },
        },
        title: 'Airport',
      },
      {}
    );
    expect(PhotoFolderInfoForm).toBeCalledWith(
      { loadedValues: 'loadedValues' },
      {}
    );
  });

  describe('when place, showingFolder and chosenAirport passed', () => {
    beforeEach(() => {
      (useAirports as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({
          chosenAirport: { attributes: { airportCode: 'airportCode' } },
        }))
      );
      (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => ({ place: 'place', showingFolder: mockedPhotoFolder }))
      );
    });

    test('renders successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(<PhotoFolderForm />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(useLoadedValues).toBeCalledWith({
        aircraftsResult: 'mockedUseAircraft',
        place: 'place',
        date: mockedPhotoFolder.photos['path1'].date,
      });
      expect(BaseAircraftForm).toBeCalledWith(
        { aircraftsResult: 'mockedUseAircraft' },
        {}
      );
      expect(BaseAirportForm).not.toBeCalled();
      expect(PhotoFolderInfoForm).toBeCalledWith(
        { loadedValues: 'loadedValues' },
        {}
      );
    });
  });
});
