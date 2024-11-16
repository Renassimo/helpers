import { renderHook } from '@testing-library/react';

import { Avia } from '@/avia/types/avia';

import useLoadedValues from '../hooks/usePhotoInfoProvider/useLoadedValues';

describe('useLoadedValues', () => {
  const registration = 'registration';
  const firstFlightDate = '2001-01-01';
  const rolloutDate = '2002-02-02';
  const deliveryDate = '2003-03-03';
  const airlineName = 'airlineName';
  const typeName = 'typeName';
  const productionLine = 'productionLine';
  const modelCode = 'modelCode';
  const model = 'model';
  const serial = 'serial';
  const place = 'place';
  const date = '2020-01-01';
  const airplaneName = 'airplaneName';

  describe('when no values passed', () => {
    test('return default values', () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        useLoadedValues({
          aircraftsResult: { chosenAircraft: null } as Avia.AircraftsResult,
          place: null,
          date: null,
        })
      );
      // Assert
      expect(result.current).toEqual({
        loadedValues: {
          title: null,
          date: null,
          place: null,
          photosUrl: null,
          extraLink: null,
          planespottersUrl: null,
          registration: null,
          carrier: null,
          manufacturer: null,
          model: null,
          firstFlight: null,
          cn: null,
          airplaneName: null,
          flown: null,
          modelled: null,
          infoReady: null,
          readyToPublish: null,
          rating: null,
          age: null,
          url: null,
        },
      });
    });
  });

  describe('when values passed', () => {
    test('return values', () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        useLoadedValues({
          aircraftsResult: {
            chosenAircraft: {
              attributes: {
                registration,
                firstFlightDate,
                rolloutDate,
                deliveryDate,
                airlineName,
                typeName,
                productionLine,
                modelCode,
                model,
                serial,
                airplaneName,
                source: 'spotted',
              },
            },
          } as Avia.AircraftsResult,
          place,
          date,
        })
      );
      // Assert
      expect(result.current).toEqual({
        loadedValues: {
          title: null,
          date,
          place,
          photosUrl: null,
          extraLink: null,
          planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
          registration,
          carrier: airlineName,
          manufacturer: typeName,
          model: modelCode,
          firstFlight: firstFlightDate,
          cn: serial,
          airplaneName,
          flown: null,
          modelled: null,
          infoReady: null,
          readyToPublish: null,
          rating: null,
          age: '19 years',
          url: null,
        },
      });
    });
  });

  describe('when firstFlightDate, typeName, modelCode not passed', () => {
    test('return values', () => {
      // Arange
      // Act
      const { result } = renderHook(() =>
        useLoadedValues({
          aircraftsResult: {
            chosenAircraft: {
              attributes: {
                registration,
                rolloutDate,
                deliveryDate,
                airlineName,
                productionLine,
                model,
                serial,
              },
            },
          } as Avia.AircraftsResult,
          place,
          date,
        })
      );
      // Assert
      expect(result.current).toEqual({
        loadedValues: {
          title: null,
          date,
          place,
          photosUrl: null,
          extraLink: null,
          planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
          registration,
          carrier: airlineName,
          manufacturer: productionLine,
          model: model,
          firstFlight: rolloutDate,
          cn: serial,
          airplaneName: null,
          flown: null,
          modelled: null,
          infoReady: null,
          readyToPublish: null,
          rating: null,
          age: '18 years',
          url: null,
        },
      });
    });

    describe('when rolloutDate not passed and source is "myFlights"', () => {
      test('return values', () => {
        // Arange
        // Act
        const { result } = renderHook(() =>
          useLoadedValues({
            aircraftsResult: {
              chosenAircraft: {
                attributes: {
                  registration,
                  deliveryDate,
                  airlineName,
                  productionLine,
                  model,
                  serial,
                  source: 'myFlights',
                },
              },
            } as Avia.AircraftsResult,
            place,
            date,
          })
        );
        // Assert
        expect(result.current).toEqual({
          loadedValues: {
            title: null,
            date,
            place,
            photosUrl: null,
            extraLink: null,
            planespottersUrl: `https://www.planespotters.net/search?q=${registration}`,
            registration,
            carrier: airlineName,
            manufacturer: productionLine,
            model: model,
            firstFlight: deliveryDate,
            cn: serial,
            airplaneName: null,
            flown: true,
            modelled: null,
            infoReady: null,
            readyToPublish: null,
            rating: null,
            age: '17 years',
            url: null,
          },
        });
      });
    });
  });
});
