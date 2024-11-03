import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { Avia } from '@/avia/types/avia';

import usePhotoInfoContext from '@/spotting/contexts/hooks/usePhotoInfoContext';

import DateInput from '@/common/components/DatePickers/DateInput';
import FreeAutoComplete from '@/common/components/FreeAutoComplete';
import ClearableInput from '@/common/components/ClearableInput';

import MockedDateInput from '@/common/components/DatePickers/DateInput/mocks';
import MockedFreeAutoComplete from '@/common/components/FreeAutoComplete/mocks';
import MockedClearableInput from '@/common/components/ClearableInput/mocks';

import PhotoFolderInfoForm from '../PhotoFolderInfoForm';
import { mockedPhotoFolder } from '@/spotting/types/mocks';
import { PhotoActionType, PhotoFolderInfoAttributes } from '@/spotting/types';

jest.mock('@/spotting/contexts/hooks/usePhotoInfoContext');
jest.mock('@/common/components/DatePickers/DateInput');
jest.mock('@/common/components/FreeAutoComplete');
jest.mock('@/common/components/ClearableInput');

describe('PhotoFolderInfoForm', () => {
  const options: Avia.Options = {
    airlines: ['Airline 1', 'Airline 2'],
    airports: ['Airport 3', 'Airport 4'],
    manufacturers: ['Manufacturer 5', 'Manufacturers 6'],
    models: ['Model 7', 'Model 8'],
  };
  const matchers: Avia.Matchers = {
    airlines: { 'Airline 1': 'Airline 2' },
    airports: { 'Airport 3': 'Airport 4' },
    manufacturers: { 'Manufacturer 5': 'Manufacturers 6' },
    models: { 'Model 7': 'Model 8' },
  };
  const dispatch = jest.fn();
  const photoInfoContext = {
    options,
    matchers,
    dispatch,
    showingFolder: mockedPhotoFolder,
  };

  beforeEach(() => {
    (DateInput as unknown as jest.Mock).mockImplementation(MockedDateInput);
    (FreeAutoComplete as unknown as jest.Mock).mockImplementation(
      MockedFreeAutoComplete
    );
    (ClearableInput as unknown as jest.Mock).mockImplementation(
      MockedClearableInput
    );
    (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
      jest.fn(() => photoInfoContext)
    );
  });

  const attributes = {
    title: 'state.title',
    date: 'state.date',
    place: 'state.place',
    photosUrl: 'state.photosUrl',
    extraLink: 'state.extraLink',
    planespottersUrl: 'state.planespottersUrl',
    registration: 'state.registration',
    carrier: 'state.carrier',
    manufacturer: 'state.manufacturer',
    model: 'state.model',
    firstFlight: 'state.firstFlight',
    cn: 'state.cn',
    airplaneName: 'state.airplaneName',
    flown: 'state.flown',
    modelled: 'state.modelled',
    infoReady: 'state.infoReady',
    readyToPublish: 'state.readyToPublish',
    rating: 'state.rating',
    age: 'state.age',
    url: 'state.url',
  };

  const loadedValues = {
    title: 'loadedValues.title',
    date: 'loadedValues.date',
    place: 'loadedValues.place',
    photosUrl: 'loadedValues.photosUrl',
    extraLink: 'loadedValues.extraLink',
    planespottersUrl: 'loadedValues.planespottersUrl',
    registration: 'loadedValues.registration',
    carrier: 'loadedValues.carrier',
    manufacturer: 'loadedValues.manufacturer',
    model: 'loadedValues.model',
    firstFlight: 'loadedValues.firstFlight',
    cn: 'loadedValues.cn',
    airplaneName: 'loadedValues.airplaneName',
    flown: 'loadedValues.flown',
    modelled: 'loadedValues.modelled',
    infoReady: 'loadedValues.infoReady',
    readyToPublish: 'loadedValues.readyToPublish',
    rating: 'loadedValues.rating',
    age: 'loadedValues.age',
    url: 'loadedValues.url',
  } as unknown as Partial<PhotoFolderInfoAttributes>;

  test('renders successfully with empty values', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(
      <PhotoFolderInfoForm loadedValues={{}} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when loaded values passed', () => {
    test('renders successfully with empty values', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <PhotoFolderInfoForm loadedValues={loadedValues} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('when state values passed', () => {
      test('renders successfully with state and loaded values', () => {
        // Arange
        const photoInfoContext = {
          options,
          matchers,
          dispatch,
          showingFolder: {
            ...mockedPhotoFolder,
            attributes,
          },
        };
        (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
          jest.fn(() => photoInfoContext)
        );
        // Act
        const { baseElement } = renderWithTheme(
          <PhotoFolderInfoForm loadedValues={loadedValues} />
        );
        // Assert
        expect(baseElement).toMatchSnapshot();
      });

      describe('when clicks save button', () => {
        test('calls dispatch', async () => {
          // Arange
          const photoInfoContext = {
            options,
            matchers,
            dispatch,
            showingFolder: {
              ...mockedPhotoFolder,
              attributes,
            },
          };
          (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
            jest.fn(() => photoInfoContext)
          );
          const { getByText } = renderWithTheme(
            <PhotoFolderInfoForm loadedValues={loadedValues} />
          );
          // Act
          await userEvent.click(getByText('Save'));
          // Assert
          expect(dispatch).nthCalledWith(1, {
            type: PhotoActionType.UPDATE_MATCHERS,
            payload: {
              airlines: { 'loadedValues.carrier': 'state.carrier' },
              airports: { 'loadedValues.place': 'state.place' },
              manufacturers: {
                'loadedValues.manufacturer': 'state.manufacturer',
              },
              models: { 'loadedValues.model': 'state.model' },
            },
          });
          expect(dispatch).nthCalledWith(2, {
            type: PhotoActionType.SAVE_FOLDER_INFO,
            payload: {
              title: 'loadedValues.title',
              date: 'loadedValues.date',
              place: 'state.place',
              photosUrl: 'loadedValues.photosUrl',
              extraLink: 'loadedValues.extraLink',
              planespottersUrl: 'loadedValues.planespottersUrl',
              registration: 'loadedValues.registration',
              carrier: 'state.carrier',
              manufacturer: 'state.manufacturer',
              model: 'state.model',
              firstFlight: 'loadedValues.firstFlight',
              cn: 'loadedValues.cn',
              airplaneName: 'loadedValues.airplaneName',
              flown: 'loadedValues.flown',
              modelled: 'loadedValues.modelled',
              infoReady: 'loadedValues.infoReady',
              readyToPublish: 'loadedValues.readyToPublish',
              rating: 'loadedValues.rating',
              age: 'loadedValues.age',
              url: 'loadedValues.url',
            },
          });
        });
      });
    });
  });

  describe('when state values passed', () => {
    test('renders successfully with state values', () => {
      // Arange
      const photoInfoContext = {
        options,
        matchers,
        dispatch,
        showingFolder: {
          ...mockedPhotoFolder,
          attributes,
        },
      };
      (usePhotoInfoContext as unknown as jest.Mock).mockImplementation(
        jest.fn(() => photoInfoContext)
      );
      // Act
      const { baseElement } = renderWithTheme(
        <PhotoFolderInfoForm loadedValues={{}} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });
});
